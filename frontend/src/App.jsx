import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './components/Login'
import SignUp from './components/SingUp'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route, Link, redirect } from 'react-router-dom'

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

let tokenExistAndStillValid = (((parseJwt(localStorage.getItem('token')).exp) * 1000) > Date.now());

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={'/sign-in'}>
                Welcome to the Future
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={tokenExistAndStillValid ? <Home /> : <Login/>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
