import React from 'react'
import Loader from '../components/Loader'

const TABLE_HEADERS=[
    "date",
    "Ndente",
    "intervention",
    "prix",
    "reçue",
    "reste",
]
const Table=({sessions})=>{
    const TableHead = ()=>{
      return  <thead>
      <tr>
         {
             TABLE_HEADERS.map(header=> <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {header}
             </th>)
         }
        
      </tr>
    </thead>
    }

    const FormRow=()=>{
        return <tr>
            <td class="y-2 bg-white text-sm"> 
            <input />
            </td>
            <td class="y-2 bg-white text-sm"> 
            <input />
            </td>
            <td class="y-2 bg-white text-sm"> 
            <input />
            </td>
            <td class="y-2 bg-white text-sm"> 
            <input />
            </td>
            <td class="y-2 bg-white text-sm"> 
            <input />
            </td>
            <td class="y-2 bg-white text-sm"> 
            <input />
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
                       <td class="y-2 bg-white text-sm">
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

const ClientAffiche = ({client}) => {

    if(client == undefined || client == null )return <Loader />
    console.log(client===undefined || client === null)
    console.log(client)
    return (
        <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden' >
           <Table sessions={client.sessions} />
 
        </div>
    )
}

export default ClientAffiche
