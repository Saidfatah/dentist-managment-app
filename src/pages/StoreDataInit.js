import React,{useEffect} from 'react'
import { connect} from 'react-redux'
const StoreDataInit=({fetchClients,children})=> {
  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  return (
    <div>
        {children}
    </div>
  );
}

export default connect(
  undefined,
  dispatch=>({
    fetchClients:dispatch.clients.fetchClients
  })
  )(StoreDataInit);
