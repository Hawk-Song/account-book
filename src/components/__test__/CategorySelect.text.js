import React from 'react'
import {mount} from 'enzyme'
import CategorySelect from '../CategorySelect'
import Ionicon from 'react-ionicons'
import { Item } from 'react-bootstrap/lib/Breadcrumb'

export const categories = [
    {
        "id": "1",
        "name": "Travel",
        "type": "outcome",
        "iconName": "ios-plane",

    },
    {
        "id": "2",
        "name": "Travel",
        "type": "outcome",
        "iconName": "ios-plane",

    },
    {
        "id": "3",
        "name": "finance",
        "type": "income",
        "iconName": "logo-yen",

    }
]

let props = {
    categories,
    onSelectCategory: jest.fn()
}

descripe('test CategorySelect component', () => {
    it('renders with categories should render the correct items', () => {
        const wrapper = mount(<CategorySelect {...props}/>)
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        expect(wrapper.find('.category-item').length).toEqual(0)
    })
})
