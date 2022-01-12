import React from 'react'
import FormRow from './FormRow'
const TABLE_HEADERS=[
    "date",
    "N°dente",
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
                class="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {header}
             </th>)
         }
        
      </tr>
    </thead>
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
       </tbody>
    }

    return <table className='w-full' >
        <TableHead />
        <TableBody  />
    </table>
}

export default Table;