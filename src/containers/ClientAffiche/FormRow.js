import React,{useState} from 'react'
import dateFormater from '../../utils/formatDate'
import {sessionSchema} from '../../store/models/clients/client.schema'
import { connect } from 'react-redux'
import {thootNumbers} from '../../store/models/clients/client.schema.js'
const thootnbr=thootNumbers

const DropdawnList =({toothNumber})=>{
  const [thootv,setthootv]=useState("")

    const options = thootnbr.map(thootNumber=> (<option key={thootNumber} value={thootNumber}>{thootNumber}</option>)) 
    return <select 
         defaultValue={toothNumber}
         className='w-full p-2 border-2 border-gray-200 '
          value={thootv} onChange={e=>setthootv(e.target.value) }
           >
             {options}
        </select>  
   }

const FormRow=({addsession})=>{
    const [canSubmit, setCanSubmit] = useState(false)
    const [formData, setformData] = useState({
        ...sessionSchema("","",0,0,0)
    })
    
    const setFormField=(field)=>e=>{
        if(!canSubmit )setCanSubmit(true)
        setformData({...formData,[field]:e.target.value})
    }
    setFormField('aza')
    const {date,price,reste,received,intervention,toothNumber}= formData
   
    return <>
     <tr>
        <td className="y-2 bg-white text-sm">
          <input 
          value={dateFormater(date)}
          readOnly
          className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' 
          />
        </td>
        <td className="y-2 bg-white text-sm"> 
        <DropdawnList  value={toothNumber}  />
        </td>
        <td className="y-2 bg-white text-sm"> 
        <input 
           value={intervention}
        onChange={setFormField('intervention')}
           placeholder='intervention'
           className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            />
        </td>
        <td className="y-2 bg-white text-sm"> 
        <input 
        value={price}
        onChange={setFormField('price')}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
        </td>
        <td className="y-2 bg-white text-sm"> 
        <input 
        value={received}
        onChange={setFormField('received')}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
        </td>
        <td className="y-2 bg-white text-sm"> 
        <input 
        value={reste}
        onChange={setFormField('reste')}
        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
        </td>
     </tr>
     {
         canSubmit && <tr className='w-full' >
         <td colSpan="6" >
              <button 
                className='w-full h-12 bg-green-400 p-2 shadow-sm text-white'
                onClick={()=>addsession(formData)} >
              ajouter 
            </button>
         </td>
     </tr>
     }
    </>
}

export default connect(
  undefined,
  (dispatch)=>({
    addsession:dispatch.clients.addsession
  })
)(FormRow) 