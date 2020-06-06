import React, {Component } from 'react'
import logo from '../logo.svg'

import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab';
import {LIST_VIEW, CHAT_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth} from "../utility"
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'

const categories = {
    "1": {
      "id": "1",
      "name": "travel",
      "type": "outcome",
      "iconName": "ios-plane"
    },
    "2": {
      "id": "2",
      "name": "Financial management",
      "type": "income",
      "iconName": "logo-yen"
    }
}

const items = [
    {
      "id": 1,
      "title": "Travel to SF",
      "price": 200,
      "date": "2019-09-10",
      "cid": 1
    },
    {
      "id": 2,
      "title": "Travel to SF",
      "price": 400,
      "date": "2019-09-10",
      "cid": 1
    },
    {
      "id": 3,
      "title": "Earn Money",
      "price": 600,
      "date": "2019-09-10",
      "cid": 2
    }
  ]

  class Home extends Component {
      constructor(props) {
          super(props)
          this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
          }
      }

      changeView = () => {

      }

      changeDate = () => {

      }

      modifyItem = () => {

      }

      createItem = () => {

      }

      deleteItem = () => {

      }


      render() {  
        const {items, currentDate, tabView} = this.state
        const itemWithCategory = items.map(item => {
          item.category = categories[item.cid]
          return item
        })
        let totalIncome = 0, totalOutCome = 0
        itemWithCategory.forEach(item => {
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
                        year={currentDate.year}
                        month={currentDate.month}
                        onChange={this.changeDate}
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
                <ViewTab activeTab={tabView} onTabChange={this.changeView}/>
                <CreateBtn btnName="Create a new item" onClick={this.createItem} />
                <PriceList 
                  items={itemWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                />
              </div>
            </React.Fragment>
          )
      }
  }

  export default Home