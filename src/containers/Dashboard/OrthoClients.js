import React, { useState, useEffect } from "react";
import { isOrthoClient } from "../../store/models/clients/client.utils";
import { connect } from "react-redux";
import ActionButton from '../../components/buttons/ActionButton'
import { useNavigate } from "react-router-dom";

const OrthoClients = ({ clientsVisitingToday }) => {
let navigate=useNavigate()
  const Head = ["Nom",
   "Prénom",
   'N°session',
  'prsence',
  'afficher'];
  const [orthoClientsVisitingToday, setOrthoClientsVisitingToday] = useState(
    []
  );
  const confirmClientAttended= (id)=>(e)=>{
  
  }
 
  const showClient= (id)=>(e)=>{
    navigate(`/clientPage/${id}`)
  }
  const clients = clientsVisitingToday;
  useEffect(() => {
    clients.forEach((client) => {
      if (isOrthoClient(client)) {
        setOrthoClientsVisitingToday((clients) => [...clients, client]);
      }
    });
  }, []);
  //table start
  console.log(orthoClientsVisitingToday)
  const TableHead = () => {
    return (
      <thead>
        <tr>
          {Head.map((header) => (
            <th
              key={header}
              className="px-5 py-3 text-left border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  
  const TableBody = () => {
    return (
      <tbody className="w-full">
        {orthoClientsVisitingToday.map((
          {
            id,
            sessions,
            perosnalInfo:{firstName,lastName}
         })=>({
           firstName,
           lastName,
           NSESSION:sessions.length,
           action1:<ActionButton id={id} onClick={confirmClientAttended(id)} title={"confirmer l'attendance"}/>,
           action2:<ActionButton onClick={showClient(id)} title={'afficher le client'}/>
  
         }))
         .map((client, index) => (
          <tr key={index}>
            {Array.from(Object.keys(client)).map((key, index) => (
              <td
                key={index}
                className="y-2  px-5 py-3 text-left bg-white text-sm"
              >
               { key!=='action1' && key!=='action2'?
                <p className="text-gray-900 whitespace-no-wrap">
                  {client[key]}
                </p>:client[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };
  //tale end
 
 
  return (
    <table className="w-full">
      <TableHead />
      <TableBody />
    </table>
  );
};

export default connect((state) => ({
  clientsVisitingToday: state.clients.clientsVisitingToday,
}))(OrthoClients);
