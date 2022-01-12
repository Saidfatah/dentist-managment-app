import React from 'react'
import Loader from '../../components/Loader'
import Table from './Table'

const ClientAffiche = ({client}) => {

    if(client == undefined || client == null )return <Loader />
    return (
        
        <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden' >
           <Table sessions={client.sessions} />
        </div>
        
    )
}

export default ClientAffiche
