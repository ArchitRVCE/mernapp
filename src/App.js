import './App.css';
import Home from './screens/Home';
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
//  import '../node_modules/react-bootstrap/Carousel';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
