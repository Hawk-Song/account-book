import React from 'react'
import {AppContext} from './App'

const withContext = (Component) => {
    return (props) => (
        <AppContent.Consumer>
            {(state) => {
                return <Component {...props} data={state}/>
            }}
        </AppContent.Consumer>
    )
}