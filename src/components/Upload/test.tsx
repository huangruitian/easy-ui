import React from 'react'
import axios from 'axios'


const Test: React.FC = (props: any) => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // 
        const files = e.target.files
        if(files){
           const uploadedFile = files[0]
           const formData = new FormData()
           formData.append(uploadedFile.name, uploadedFile)
           axios.post(url, formData, {
               headers:{
                   'Content-Type': 'multipart/form-data'
               }
           }).then(resp => {
               console.log('resp', resp)
           })
        }
    }
    return (
        <div>
           <input type="file" name="file" id="file" onChange={handleChange} 
           onClick={(e) => {
             console.log(e)
           }}/>
        </div>
    )
}


export default Test