import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './common/Routes';
import { Breadcrumbs, MainMenu } from './layout';

import './App.scss';

export default class App extends React.Component<any, any> {
  render() {
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
}
