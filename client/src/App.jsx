import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import * as Pages from './pages'
import ProtectedRoute from './routes';

import './assets/css/globalStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  // async function handleAuth(){

  //   response = await fetch("users/ping")
  // }

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path='/' element={<ProtectedRoute redirectTo="/welcome"/>}>
          <Route index element={<Pages.Home />} />
        </Route>
        
        <Route path="/about" element={<Pages.About />} />
        <Route path="/support" element={<Pages.Support />} />
        <Route path="/login-register" element={<Pages.Login />}/>

        <Route path='/profile' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.Profile />} />
        </Route>

        <Route path='/shop' element={<ProtectedRoute redirectTo="/welcome"/>}>
          <Route index element={<Pages.Shop />} />
        </Route>
        
        <Route path='/selfcare' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.SelfCare />} />
        </Route>
        
        <Route path='/breathe' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.Breathing />} />
        </Route>
        <Route path='/familyfriends' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.FamFri />} />
        </Route>
        
        <Route path='/air' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.FreshAir />} />
        </Route>
        
        <Route path='/playlist' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.Playlist />} />
        </Route>
        
        <Route path='/mystery' element={<ProtectedRoute redirectTo="/login-register"/>}>
          <Route index element={<Pages.Mystery />} />
        </Route>

        <Route path="*" element={<Pages.NotFound />} />
      </Route>
      <Route path="reset-password" element={<Pages.PasswordReset/>} />
      <Route path="welcome" element={<Pages.Welcome/>} />
    </Routes>
  );
}

export default App;
