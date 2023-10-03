import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import * as Pages from './pages'

import './assets/css/globalStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/support" element={<Pages.Support />} />
        <Route path="/profile" element={<Pages.Profile />} />
        <Route path="/shop" element={<Pages.Shop />} />
        <Route path="/login-register" element={<Pages.Login />}/>
        <Route path="*" element={<Pages.NotFound />} />
        <Route path="/selfcare" element={<Pages.SelfCare />} />
        <Route path="/breathe" element={<Pages.Breathing />} />
        <Route path="/familyfriends" element={<Pages.FamFri />} />
        <Route path="/air" element={<Pages.FreshAir />} />
        <Route path="/playlist" element={<Pages.Playlist />} />
        <Route path="/mystery" element={<Pages.Mystery />} />
      </Route>
      <Route path="reset-password" element={<Pages.PasswordReset/>} />
    </Routes>
  );
}

export default App;
