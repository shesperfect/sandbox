import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './common/Routes';
import { Breadcrumbs, MainMenu } from './layout';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <MainMenu />
        <Breadcrumbs />

        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
