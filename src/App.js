import React from 'react';
import './App.css';
import AppNav from './components/AppNav'
import Category from './components/Category'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Expenses from './components/Expenses';

function App() {
  return (
    <BrowserRouter>
        <AppNav/>
      <Switch>
        <Route path="/categories" exact component={Category}/>
        <Route path="/" exact component={Expenses}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
