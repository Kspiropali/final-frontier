import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import * as Pages from './pages'

import './assets/css/globalStyles.css'

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Pages.Home />} />
        <Route path="/about" element={<Pages.About />} />
        <Route path="/support" element={<Pages.Support />} />
        <Route path="/profile" element={<Pages.Profile />} />
        <Route path="/shop" element={<Pages.Shop />} />
        <Route path="*" element={<Pages.NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
