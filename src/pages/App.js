import '../styles/App.css';
import store from '../store/store'
import { Provider} from 'react-redux'
import Routes from './routes'

 
const App=()=> {
  return (
    <Provider store={store}> 
         <Routes />
  </Provider>
  );
}

export default App;
