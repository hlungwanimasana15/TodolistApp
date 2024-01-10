import React,{ useState } from 'react';
import './App.css';
import Home from './compounents/home';
import LoginForm from './compounents/loginForm';
import Registration from './compounents/Registration';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';


function App() {

  const [isLoggedIn, setUserState] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"/> } />
        <Route path='home' element={<Home />} />
        <Route path='login' element={ !isLoggedIn ? <LoginForm  setUserState={setUserState}/> : <Navigate to="/"/> } />
        <Route path='registration' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App;
