import React,{useEffect} from 'react'
import ClientAfficheContainer from '../containers/ClientAffiche'
import {useParams} from "react-router-dom";
import { connect } from 'react-redux';

const ClientAffiche = ({client,getClientById}) => {
    let { id } = useParams();

    useEffect(() => {
        setTimeout(() => {
            
            getClientById({id})
        }, 2000);
    }, [getClientById])

    return (
        <div>
           <ClientAfficheContainer client={client}  />
        </div>
    )
}

export default connect(
    (state)=>({
       client:state.clients.visitedClient
    }),
    (dispatch)=>({
        getClientById:dispatch.clients.getClientById,
    }),

)(ClientAffiche)
