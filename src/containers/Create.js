import React from 'react'
import CategorySelect from '../components/CategorySelect'
import {Tabs, Tab} from '../components/Tabs'
import PriceForm from '../components/PriceForm'
import {TYPE_INCOME, TYPE_OUTCOME} from '../utility'
import {testCategories} from '../testData'
import {AppContext} from '../App'
import withContext from '../WithContext'
import {withRouter} from 'react-router-dom'
const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: TYPE_OUTCOME,
            selectedCategory: null,
        }
    }
    
    tabChange = (index) => {
        this.setState({
            selectedTab: tabsText[index]
        })
    }
    selectedCategory = (category) => {
        this.setState({
            selectedCategory: category
        })
    }
    cancelSubmit = () => {
        this.props.history.push('/')
    }
    submitForm = (data, isEditMode) => {
        if (!isEditMode) {
            //create
            this.props.actions.createItem(data, this.state.selectedCategory.id)
        } else {
            //update
        }
        this.props.history.push('/')
    }

    render() {
        const {data} = this.props
        const {items, categories} = data
        const {selectedTab} = this.state
        const filterCategories = Object.keys(categories)
        .filter(id => categories[id].type === selectedTab)
        .map(id => categories[id])
        return (
            <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff'}} >
                <Tabs activeIndex={0} onTabChange={() => {}}>
                    <Tab>outcome</Tab>
                    <Tab>income</Tab>
                </Tabs>
                <CategorySelect categories={filterCategories} 
                    onSelectCategory={this.selectedCategory} 
                />
                <PriceForm
                    onFormSubmit={this.submitForm}
                    onCancelSubmit={this.cancelSubmit}
                />
            </div>
        )
    }
}

export default withRouter(withContext(Create))
