import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab';
import {LIST_VIEW, CHAT_VIEW} from "./utility"
import MonthPicker from './components/MonthPicker'

const items = [
  {
    "id": 1,
    "title": "Travel to SF",
    "price": 200,
    "date": "2019-09-10",
    "category": {
      "id": "1",
      "name": "travel",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  },
  {
    "id": 2,
    "title": "Travel to SF",
    "price": 400,
    "date": "2019-09-10",
    "category": {
      "id": "1",
      "name": "travel",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  },
  {
    "id": 3,
    "title": "Travel to SF",
    "price": 600,
    "date": "2019-09-10",
    "category": {
      "id": "1",
      "name": "travel",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  }
]

function App() {
  return (
    <div className="App">
      <ViewTab 
        activeTab={LIST_VIEW}
        onTabChange={(view) => {console.log(view)}}
      />
      <MonthPicker 
        year={2018}
        month={5}
      />
      <PriceList 
        items={items} 
        onModifyItem={(item) => {alert(item.id)}}
        onDeleteItem={(item) => {alert(item.id)}}
      />
    </div>
  );
}

export default App;
