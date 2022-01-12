import '../styles/App.css';
import { Provider} from 'react-redux'
import Layout  from './Layout';
import store from '../store/store'
const App=()=> {
  return (
    <Provider store={store}> 
     <Layout />        
    </Provider>
  );
}

export default App;
