import { BrowserRouter } from 'react-router-dom'
import Rotas from './Rotas';
import Navbar from './componentes/nav-bar/Navbar';
import { ToastContainer} from 'react-toastify'
import AuthProvider from './contexto/AuthContext'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer/>
        <Navbar />
        <Rotas />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
