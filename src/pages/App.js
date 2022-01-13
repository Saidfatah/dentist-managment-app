import React,{useEffect} from 'react'
import '../styles/App.css';
import { Provider,connect} from 'react-redux'
import Layout  from './Layout';
import StoreDataInit  from './StoreDataInit';
import store from '../store/store'
const App=()=> {


  return (
    <Provider store={store}> 
    <StoreDataInit>
     <Layout />        
    </StoreDataInit>
    </Provider>
  );
}

export default App;
