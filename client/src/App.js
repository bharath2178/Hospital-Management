
import './App.css';
import Login from './Login';
import Mainpage from './Mainpage';
import Doctor from'./Doctor';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/main" element={<Mainpage />}/>
        <Route path="/doctor" element={<Doctor />}/>
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;
