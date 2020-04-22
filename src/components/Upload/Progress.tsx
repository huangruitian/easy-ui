import React, { FC } from 'react'

export interface IProgress {
    percent:number
}

const Progress: FC<IProgress> = (props) => {
    const { percent } = props
    return (
        <div>
           uploading...{percent}
        </div>
    )
}


export default Progress