import React from 'react'
import { useForm } from 'react-hook-form'

const Test: React.FC = (props: any) => {
    const { register, handleSubmit, errors, ...restProps } = useForm();
    const onSubmit = (data: any) => {
        console.log('data：', data)
    };
    console.log('errors：', errors)
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="firstName" ref={
                register({
                    required: true
                })
            } />
            <div> {errors.firstName && 'firstName error!'}</div>   
            <input type="text" name="lastName" ref={
                register({
                    required: "This is required"
                })
            } />
            <div> {errors.lastName?.message}</div>   
            <input type="submit" value='TIJIAO' />
        </form>
    )
}


export default Test