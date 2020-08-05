import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'

class UserInfo extends Component {
    state = {
        header: '',
        location: '',
        info: '',
        housestyle: '',
        rent: '',
    }

    // update header state
    setHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render () {
        // if user information has been completed, redirect to home page
        const {header} = this.props.user
        if(header) {
            const path = '/personal'
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>Personal Information</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='Preferred Location' onChange={val => {this.handleChange('location', val)}}>Location:</InputItem>
                <InputItem placeholder='House Style' onChange={val => {this.handleChange('housestyle、', val)}}>House Style:</InputItem>
                <InputItem placeholder='Preferred Rent' onChange={val => {this.handleChange('rent', val)}}>Rent:</InputItem>
                <TextareaItem title="Introduction: "
                              placeholder='Please introduce yourself briefly'
                              rows={4} onChange={val => {this.handleChange('info', val)}}/>
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(UserInfo)
