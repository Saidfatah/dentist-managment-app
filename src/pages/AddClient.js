import React,{useState} from 'react'
import { clientSchema } from '../store/models/clients/client.schema'
import { connect } from 'react-redux'
 const AddClient = ({addnewclient}) => {
     
    const [formData, setformData] = useState({
        ...clientSchema("","","","","","")
    })
    
    const setFormField=(field)=>e=>{   
        setformData({...formData,[field]:e.target.value})
    }
    setFormField('')
    const {firstName,lastName,age,tel,profession,adress,CIN}=formData
    return (
        <>
        <h1 className='font-bold uppercase text-center'>entrez les informations de patient</h1>
        <form className="w-full  ">
            {/* input start */}
            <div>
            <div className=" inline-block w-1/2 md:items-center mb-6">
                <div className="md:w-1/3">
            <label className=" text-gray-500 font-semibold md:text-right mb-1 md:mb-0 pr-4" htmlFor='name'>Nom</label>
                </div>
                <div className="md:w-2/3">    
            <input 
             value={firstName}
        onChange={setFormField('firstName')}
             className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='name' />
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className=" inline-block w-1/2 md:items-center mb-6">
                <div className="md:w-1/3">
            <label className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='prename'>Prénom</label>
                </div>
                <div className="md:w-2/3">    
            <input 
                value={lastName}
        onChange={setFormField('lastName')}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='prename'/>
                </div>
            </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="inline-block w-1/2 md:items-center mb-6">
                <div className="md:w-1/3">
            <label className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='age'>Age</label>
                </div>
                <div className="md:w-2/3">    
            <input
                value={age}
        onChange={setFormField('age')}
             className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='age'/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="inline-block w-1/2 md:items-center mb-6">
                <div className="md:w-1/3">
            <label className=" text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='tel'>Tél</label>
                </div>
                <div className="md:w-2/3">    
            <input 
                value={tel}
        onChange={setFormField('tel')}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='tel'/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/6">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='profession'>Profession</label>
                </div>
                <div className="md:w-2/3">    
            <input 
                value={profession}
        onChange={setFormField('profession')}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='profession' />
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/6">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='Adresse'>Adresse</label>
                </div>
                <div className="md:w-2/3">    
            <input
                value={adress}
        onChange={setFormField('adress')}
             className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='adresse' />
                </div>
            </div>
            {/* input end */}
            <div className='flex flex-col justify-center items-center'>
                 <button 
                 onClick={(e)=>{
                     e.preventDefault()
                     addnewclient(formData)
                }}
                 className='p-3 font-medium bg-green-400 rounded-sm'
                  >Next</button> 
            </div>
         
        </form>
        </>
    )
}
export default connect(
    undefined,
    (dispatch)=>({
        addnewclient:dispatch.clients.addnewclient
    })
    )(AddClient) 