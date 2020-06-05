import React, {Component } from 'react'
import logo from '../logo.svg'

import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab';
import {LIST_VIEW, CHAT_VIEW, TYPE_INCOME, TYPE_OUTCOME} from "../utility"
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'

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
      "title": "Earn Money",
      "price": 600,
      "date": "2019-09-10",
      "category": {
        "id": "1",
        "name": "travel",
        "type": "income",
        "iconName": "ios-yen"
      }
    }
  ]

  class Home extends Component {
      render() {  
        let totalIncome = 0, totalOutCome = 0
        items.forEach(item => {
          if (item.category.type === TYPE_OUTCOME) {
            totalOutCome += item.price
          } else {
            totalIncome += item.price
          }
        })

          return (
            <React.Fragment>
              <header className="App-header">
                 <div className="row mb-5">
                  <img src={logo} className="App-logo" alt="logo"></img>
                 </div>
                 <div className="row">
                   <div className="col">
                     <MonthPicker
                        year={2020}
                        month={8}
                        onChange={() => {}}
                     />
                   </div>
                   <div className="col">
                     <TotalPrice
                      income = {totalIncome}
                      outcome = {totalOutCome}
                     />
                   </div>
                 </div>
              </header>
              <div className="content-area py-3 px-3">
                <ViewTab activeTab={LIST_VIEW} onTabChange={()=>{}}/>
                <CreateBtn btnName="Create a new item" onClick={() => {}} />
                <PriceList 
                  items={items}
                  onModifyItem={() => {}}
                  onDeleteItem={() => {}}
                />
              </div>
            </React.Fragment>
          )
      }
  }

  export default Home