import React from 'react'
import PropTypes from 'prop-types'
import {padLeft, range} from '../utility'

class MonthPicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            selectedYear: this.props.year,
            selectedMonth: this.props.month
        }
    }

    toggleDropdown = (event) => {
        event.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    selectedYear = (event, yearNumber) => {
        event.preventDefault()
        this.setState({
            selectedYear: yearNumber
        })
    }


    selectedMonth = (event, monthNumber) => {
        event.preventDefault()
        this.setState({
            isOpen: false,
            selectedMonth: monthNumber
        })
        this.props.onChange(this.state.selectedYear, monthNumber)
    }

    render() {
        const {isOpen, selectedYear, selectedMonth} = this.state
        const monthRange = range(12, 1)
        const yearRange = range(9, -4).map(number => number + selectedYear)
        return (
            <div className="dropdown month-picker-component">
                <div>Select Month</div>
                <button 
                    className="btn btn-lg btn-secondary dropdown-toggle"
                    style={{minWidth: "150px"}}
                    onClick={this.toggleDropdown}
                >
                    {`${padLeft(selectedMonth)}/${selectedYear}`}
                </button>
                {
                    isOpen && 
                    <div className="dropdown-menu" style={{display: 'block'}}>
                        <div className="row">
                            <div className="col border-right">
                                {yearRange.map((yearNumber, index) => 
                                    <a 
                                        key={index} 
                                        href="#"
                                        onClick = {(event) => this.selectedYear(event, yearNumber)}
                                        className={(yearNumber === selectedYear) ? 'dropdown-item active' : "dropdown-item" }
                                    >
                                        {yearNumber}
                                    </a>
                                )}
                            </div>
                            <div className="col">
                                {monthRange.map((monthNumber, index) => 
                                    <a 
                                        key={index} 
                                        href="#"
                                        onClick = {(event) => this.selectedMonth(event, monthNumber)}
                                        className={(monthNumber === selectedMonth) ? 'dropdown-item active' : "dropdown-item" }
                                    >
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

MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default MonthPicker