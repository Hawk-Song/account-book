import React, {Component } from 'react'
import logo from '../logo.svg'

import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab';
import {LIST_VIEW, CHAT_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft} from "../utility"
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'
import {Tabs, Tab} from '../components/Tabs'
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
      "date": "2020-06-10",
      "cid": 1
    },
    {
      "id": 2,
      "title": "Travel to SF",
      "price": 400,
      "date": "2020-07-10",
      "cid": 1
    },
    {
      "id": 3,
      "title": "Earn Money",
      "price": 600,
      "date": "2020-09-10",
      "cid": 2
    }
  ]

  const newItem = {
    "id": 4,
    "title": "Newly added item",
    "price": 300,
    "date": "2019-09-12",
    "cid": 1
  }

  class Home extends Component {
      constructor(props) {
          super(props)
          this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
          }
      }

      changeView = (view) => {
          this.setState({
            tabView: view
          })
      }

      changeDate = (year, month) => {
          this.setState({
            currentDate: {year, month}
          })
      }

      modifyItem = (modifiedItem) => {
          const modifiedItems = this.state.items.map(item => {
            if (item.id === modifiedItem.id) {
              return { ...item, title: 'updated title' }
            } else {
              return item
            }
          })

          this.setState({
            items: modifiedItems
          })
          
      }

      createItem = () => {
        this.setState({
          items: [newItem, ...this.state.items]
        })
      }

      deleteItem = (deletedItem) => {
        const filteredItems = this.state.items.filter(item => item.id != deletedItem.id)
        this.setState({
          items: filteredItems
        })
      }


      render() {  
        const {items, currentDate, tabView} = this.state
        const itemWithCategory = items.map(item => {
          item.category = categories[item.cid]
          return item
        }).filter(item => {
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
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
                <Tabs activeIndex={0} onTabChange={() =>{}}>
                  <Tab>1st item</Tab>
                  <Tab>2nd item</Tab>
                </Tabs>
                <ViewTab activeTab={tabView} onTabChange={this.changeView}/>
                <CreateBtn btnName="Create a new item" onClick={this.createItem} />
                {
                  tabView === LIST_VIEW && 
                  <PriceList 
                    items={itemWithCategory}
                    onModifyItem={this.modifyItem}
                    onDeleteItem={this.deleteItem}
                  />
                }
                {
                  tabView === CHAT_VIEW && 
                  <h1>This is chat view</h1>
                }
              </div>
            </React.Fragment>
          )
      }
  }

  export default Home