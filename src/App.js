import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from './components/Home'
import Create from './containers/Create'
import {testItems, testCategories} from './testData'
import {flatternArr} from './utility'

export const AppContext = React.createContext()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: flatternArr(testItems),
      categories: flatternArr(testCategories)
    }
  }

  render() {
    console.log("jjjj")
    return (
      <AppContext.Provider value={{
        state: this.state
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
