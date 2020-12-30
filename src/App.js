import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
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
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth()
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }
    }

    this.actions = {
      getInitalData: withLoading(async () => {
        const {currentDate} = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('categories'), axios.get(getURLWithData)])
        const [categories, items] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false
        })
        return items
      }),

      getEditData: withLoading(async (id) => {
        const {items, categories} = this.state
        let promiseArr = []
        if (Object.keys(categories).length === 0) {
          promiseArr.push(axios.get('/categories'))
        }
        if (id && !items[id]) {
          const getURLWithID = `/items/${id}`
          promiseArr.push(axios.get(getURLWithID))
        }

        const [fetchedCategories, editItem] = await Promise.all(promiseArr)
        const finalCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        if (id) {
          this.setState({
            categories: finalCategories,
            isLoading: false,
            items: {...this.state.items, [id]: finalItem}
          })
        } else {
          this.setState({
            categories: finalCategories,
            isLoading: false
          })
        }
        return {
          categories: finalCategories,
          editItem: finalItem
        }
      }),

      selectNewMonth: withLoading(async (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: {year, month},
          isLoading: false
        })
        return items
      }),

      deleteItem: withLoading(async (item) => {
        const deleteItem = await axios.delete(`/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
        return deleteItem
      }),

      createItem: withLoading(async (data, categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items', {...data, id: newId, cid: categoryId})
        this.setState({
          items: {...this.state.items, [newId]: newItem.data},
          isLoading: false
        })
        return newItem
      }),
      updateItem: withLoading(async (item, updatedCategoryId) => {
        const updatedData = {
          ...item,
          cid: updatedCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        const modifiedItem = await axios.put(`/items/${item.id}`, updatedData)
        this.setState({
          items: {...this.state.items, [modifiedItem.id]:modifiedItem.data},
          isLoading: false
        })
        return modifiedItem
      })
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
                <Route path='/edit/:id' component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App;
