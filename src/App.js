import './App.css';
import store from './store/store'
import { Provider,connect} from 'react-redux'


const Test=connect(
  state=>({authenticated:state.auth.authenticated})
  )( ({authenticated})=>{
    console.log(authenticated)
   if(authenticated === false )
   return <p>return authentication page for user to logg in </p>

   return <p>user is logged </p>
})
const App=()=> {
  return (
    <Provider store={store}> 
         <Test />
  </Provider>
  );
}

export default App;
