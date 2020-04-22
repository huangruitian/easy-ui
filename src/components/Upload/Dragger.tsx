import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [ dragOver, setDragOver ] = useState(false)
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver
  })
  
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    // 如果在div区域下放下鼠标，会有文件；
    console.log('handleDrop', e.dataTransfer)
    onFile(e.dataTransfer.files)
  }
  //提前布置好的div拖拽进来或者离开，onDragOver/onDragLeave 都会触发这个事件
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  return (
    <div 
      className={klass}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;