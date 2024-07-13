import './App.css';
import Home from './screens/Home';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrders from './screens/MyOrders'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import { CartProvider } from './components/ContextReducer'
//  import '../node_modules/react-bootstrap/Carousel';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/MyOrders" element={<MyOrders/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
