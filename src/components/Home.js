import React, {Component } from 'react'
import logo from '../logo.svg'
import {withRouter} from 'react-router-dom'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab';
import {LIST_VIEW, CHAT_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft} from "../utility"
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'
import {Tabs, Tab} from '../components/Tabs'
import Ionicon from 'react-ionicons'
import {AppContext} from '../App'
import withContext from '../WithContext'
import Loader from '../components/Loader'
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

  const tabsText = [ LIST_VIEW, CHAT_VIEW]

  class Home extends Component {
      constructor(props) {
          super(props)
          this.state = {
            tabView: tabsText[0]
          }
      }

      componentDidMount() {
        this.props.actions.getInitalData()
      }

      changeIndex = (index) => {
          this.setState({
            tabView: tabsText[index]
          })
      }

      changeDate = (year, month) => {
          this.props.actions.selectNewMonth(year, month)
      }

      modifyItem = (item) => {
        this.props.history.push(`/edit/${item.id}`)
      }

      createItem = () => {
        this.props.history.push('./create')
      }

      deleteItem = (item) => {
        this.props.actions.deleteItem(item);
      }


      render() {  
        const {data} = this.props
        const {items, categories, currentDate, isLoading} = data
        const {tabView} = this.state
        const itemWithCategory = Object.keys(items).map(id => {
          items[id].category = categories[items[id].cid]
          return items[id]
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
              { isLoading && 
                <Loader />
              }
              {!isLoading &&
                <React.Fragment>
                  <Tabs activeIndex={0} onTabChange={this.changeIndex}>
                    <Tab>
                      <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={'#007bff'}
                        icon='ios-paper'
                      />
                      List Mode
                    </Tab>
                    <Tab>
                      <Ionicon
                        className="rounded-circle mr-2"
                        fontSize="25px"
                        color={'#007bff'}
                        icon='ios-pie'
                      />
                      Chart Mode
                    </Tab>
                  </Tabs>
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
                </React.Fragment>
              }
            </div>
          </React.Fragment>
        )
      }
  }

  export default withRouter(withContext(Home))