import React from 'react'
import PropTypes from 'prop-types'
import {padLeft, range} from '../utility'

class MonthPicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggleDropdown = (event) => {
        event.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const {year, month} = this.props
        const {isOpen} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(number => number + year)
        return (
            <div className="dropdown month-picker-component">
                <div>Select Month</div>
                <button 
                    className="btn btn-lg btn-secondary dropdown-toggle"
                    style={{minWidth: "150px"}}
                    onClick={this.toggleDropdown}
                >
                    {`${padLeft(month)}/${year}`}
                </button>
                {
                    isOpen && 
                    <div className="dropdown-menu" style={{display: 'block'}}>
                        <div className="row">
                            <div className="col border-right">
                                {yearRange.map((yearNumber, index) => 
                                    <a key={index} className="dropdown-item">
                                        {yearNumber}
                                    </a>
                                )}
                            </div>
                            <div className="col">
                                {monthRange.map((monthNumber, index) => 
                                    <a key={index} className="dropdown-item">
                                        {padLeft(monthNumber)}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default MonthPicker