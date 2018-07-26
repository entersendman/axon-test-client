import React, { Component } from 'react';
import Layout from './Layout'
class UsersTable extends Component {
	state = {
		first_name: '',
		last_name: '',
		dob: '',
		location: ''
	}
	editUserHandler = id => {
		const userArr = [...this.props.users]
		for (let i = 0; i < userArr.length; i++){
			userArr[i].editable = false
			if(userArr[i].id === id){
				userArr[i].editable = !userArr[i].editable
				this.setState({
					first_name: userArr[i].first_name,
					last_name: userArr[i].last_name,
					dob: userArr[i].dob,
					location: userArr[i].location
				})
			}
		}
		this.setState({
			editableUserArr: userArr
		})
	}
	changeInputHandler = (target, id) => {
		const editedUsers = [...this.props.users]
		for (let i = 0; i < editedUsers.length; i++){
			if(editedUsers[i].id === id){
				switch (target.id) {
					case 'firstName':
						editedUsers[i].first_name = target.value
						this.setState({
							first_name: target.value
						})
						break
					case 'lastName':
						editedUsers[i].last_name = target.value
						this.setState({
							last_name: target.value
						})
						break
					case 'dob':
						editedUsers[i].dob = target.value
						this.setState({
							dob: target.value
						})
						break
					case 'location':
						editedUsers[i].location = target.value
						this.setState({
							location: target.value
						})
						break
				}
			}
		}
			this.setState({
				editedUserArr: editedUsers
			})
	}
	saveUserHandler = (id) => {
		const editedUser = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			dob: this.state.dob,
			location: this.state.location
		}
		fetch('/users/' + id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedUser)
		})
			.catch(error => console.log(error))
		fetch('/users')
			.then(res => res.json())
			.then(users => this.props.updateData(users))
	}
	 deleteUserHandler = id => {
		console.log(id)
		fetch('/users/' + id, {
			method: 'DELETE'
		})
			.catch(error => console.log(error))
		fetch('/users')
			.then(res => res.json())
			.then(users => this.props.updateData(users))
	}
	render(){
		const users = this.props.users
		return (
			<Layout users={users}
			        deleteUserHandler={this.deleteUserHandler}
			        editUserHandler={this.editUserHandler}
			        changeInputHandler={this.changeInputHandler}
			        saveUserHandler={this.saveUserHandler}/>
		);
	}
}
export default UsersTable;