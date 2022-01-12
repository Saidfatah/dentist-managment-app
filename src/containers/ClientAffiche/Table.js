import React from 'react'
import dateFormater from '../../utils/formatDate'


import {thootNumbers} from '../../store/models/clients/client.schema.js'
const thootnbr=thootNumbers

const TABLE_HEADERS=[
    "date",
    "N°dente",
    "intervention",
    "prix",
    "reçue",
    "reste",
]

const DropdawnList =()=>{
    const options = thootnbr.map(thootNumber=> (<option value={thootNumber}>{thootNumber}</option>))
         return <select 
         className='w-full p-2   border-2 border-gray-200 ' >
             {options}
        </select>  
   }

const Table=({sessions})=>{
    const TableHead = ()=>{
      return  <thead>
      <tr>
         {
             TABLE_HEADERS.map(header=> <th
                class="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {header}
             </th>)
         }
        
      </tr>
    </thead>
    }

    const FormRow=()=>{
        return <tr>
            <td className="y-2 bg-white text-sm">
              <input 
              value={dateFormater(new Date())}
              readOnly
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' 
              />
            </td>
            <td className="y-2 bg-white text-sm"> 
            <DropdawnList/>
            </td>
            <td className="y-2 bg-white text-sm"> 
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
            </td>
            <td className="y-2 bg-white text-sm"> 
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
            </td>
            <td className="y-2 bg-white text-sm"> 
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
            </td>
            <td className="y-2 bg-white text-sm"> 
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
            </td>
        </tr>
    }
    const TableBody=()=>{

         return   <tbody className='w-full' >
           {
               sessions.map(session=>
                
               (<tr>
                   {
                       Array.from(Object.keys(session)).map((key)=>
                       <td class="y-2  px-5 py-3 text-left bg-white text-sm">
                       <p class="text-gray-900 whitespace-no-wrap">
                        {
                           key==="date"?
                           new Date(session[key] ).toDateString()
                           :session[key] 
                        }
                       </p>
                      </td>
                       )
                   }
               
               </tr>)
             )
                   
           }
           <FormRow />
           <tr className='w-full' >
               <td colSpan="6" >

           <button 
           className='w-full h-12 bg-green-400 p-2 shadow-sm text-white'
           >ajouter</button>
               </td>
           </tr>
       </tbody>
    }

    return <table className='w-full' >
        <TableHead />
        <TableBody  />
    </table>
}

export default Table;