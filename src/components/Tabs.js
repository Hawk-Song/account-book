import React from 'react'
import PropTypes from 'prop-types'

export class Tabs extends React.Component {
    render() {
        const {children, activeIndex} = this.props
        return (
            <ul className='nav nav-tabs nav-fill my-4'>
                {
                    React.Children.map(children, (child, index) => {
                        const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link'
                        return (
                            <li className="nav-item">
                                <a
                                    className={activeClassName}
                                    href="#"
                                >
                                    {child}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

Tabs.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired,
}

export const Tab = ({children}) => 
<React.Fragment>{children}</React.Fragment>