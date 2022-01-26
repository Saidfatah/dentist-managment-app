import { useState } from "react"

export const Verification = (formdate)=>{
    const errorMessage={
        firstNameError:'',
        lastNameError:'',
    }
const {CIN,address,age,firstName,lastName,phone}=formdate
    if (firstName === '') {
        errorMessage.firstNameError='intre le nom de client'
    }if(lastName === ''){
        errorMessage.lastNameError='intre le prénom de client'
        
    }
    if(errorMessage.firstNameError!== ''||errorMessage.lastNameError!== ''){
            return {value:false,message:errorMessage}
        }
    return {value:true}
}