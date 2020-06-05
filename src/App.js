import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab';
import {LIST_VIEW, CHAT_VIEW} from "./utility"
import MonthPicker from './components/MonthPicker'
import Home from './components/Home'


function App() {
  return (
    <div className="App">
       <Home />
    </div>
  );
}

export default App;
