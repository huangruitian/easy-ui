import React, { useRef, useState, useCallback } from 'react'
import axios from 'axios'
import Button from '../Button/Button'
import FileList from './FileList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: any
  response?: any
  error?: any
}

export interface IUploadProps {
  /** 上传地址，必传项 */
  action: string;
  /** 可以做上传前的一些验证 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传进度 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传之后的回调 */
  onChange?: (file: File) => void;
  /** 上传成功的回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败的回调 */
  onError?: (err: any, file: File) => void;
  /** 默认的文件 */
  defaultFileList?: UploadFile[],
  /** 删除一个文件的回调 */
  onRemove?: (file: UploadFile) => void
}

const Upload: React.FC<IUploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    onChange,
    beforeUpload,
    defaultFileList,
    onRemove,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadedFiles(files)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const uploadFile = (_file: UploadFile, filePropsObj: Partial<UploadFile>) => {
    setFileList(preFileList => {
      return preFileList.map((file) => {
        if (file.uid === _file.uid) {
          return { ...file, ...filePropsObj }
        } else {
          return file
        }
      })
    })
  }

  console.log('fileList', fileList)
  const postFile = (file: File) => {
    // 文件初始化状态
    const _file: UploadFile = {
      uid: `File_${Date.now()}_${(Math.random() * 1000000).toFixed(0)}`,
      name: file.name,
      size: file.size,
      status: "ready",
      percent: 0,
      raw: file
    }
    setFileList([...fileList, _file])
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (e) => {
        let percentage = (Math.round(e.loaded * 100) / e.total) || 0
        uploadFile(_file, {
          status: "uploading",
          percent: percentage,
        })
        if (percentage < 100) {
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      if (onSuccess) {
        onSuccess(resp, file)
      }
      if (onChange) {
        onChange(file)
      }
      uploadFile(_file, {
        response: resp.data,
        status: 'success'
      })
    }).catch(err => {
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
      uploadFile(_file, {
        error: err,
        status: "error"
      })
    })
  }

  const uploadedFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        postFile(file)
      } else {
        const checkFile = beforeUpload(file)
        if (checkFile instanceof Promise) {
          checkFile.then(processedFile => {
            postFile(processedFile)
          })
        } else if (checkFile === true) {
          postFile(file)
        }
      }
    })
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleRemove = (_file: UploadFile) => {
    setFileList(preList => {
      return preList.filter(file => file.uid !== _file.uid)
    })
    if (onRemove) {
      onRemove(_file)
    }
  }

  return (
    <div className="viking-upload-component">
      <div className="viking-upload-input">
        <Button
          btnType="primary"
          onClick={handleClick}
        >
          upload file
      </Button>
        <input
          className="viking-file-input"
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange} />
      </div>
      <FileList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}


export default Upload