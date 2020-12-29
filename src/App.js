import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from './components/Home'
import Create from './containers/Create'
import {testItems, testCategories} from './testData'
import {flatternArr, ID, parseToYearAndMonth} from './utility'

export const AppContext = React.createContext()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
      },

      createItem: (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = {...data, id: newId, cid: categoryId}
        this.setState({
          items: {...this.state.items, [newId]: newItem}
        })
      }
    }
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
                <Route path='/' exact component={Home} />
                <Route path='/create' component={Create} />
                <Route path='edit/:id' component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App;
