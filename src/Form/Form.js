import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		marginBottom: '50px'
	},
	button: {
		margin: theme.spacing.unit,
	},
});


class Form extends Component {
	state = {
		firstName: '',
		lastName: '',
		dob: '',
		location: ''
	}

	handleFirsName = (evt) => this.setState({ firstName: evt.target.value });
	handleLastName = (evt) => this.setState({ lastName: evt.target.value });
	handleDob = (evt) => this.setState({ dob: evt.target.value });
	handleLocation = (evt) => this.setState({ location: evt.target.value });

	onSubmitHandler = () => {
		const newUser = {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			dob: this.state.dob,
			location: this.state.location
		}
		fetch('/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})
			.then(() => {this.setState({
				firstName: '',
				lastName: '',
				dob: '',
				location: ''
			})})
			.catch(error => console.log(error))
		fetch('/users')
			.then(res => res.json())
			.then(users => this.props.updateData(users))
	}
	render() {
		const { classes } = this.props;
		const { firstName, lastName, dob, location } = this.state;
		const isEnabled =
			firstName.length > 0 &&
			lastName.length > 0 &&
			dob.length > 0 &&
			location.length > 0
		return (
			<div>
				<h1>Form</h1>
				<div>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="name-simple">First Name</InputLabel>
						<Input value={this.state.firstName}
						       onChange={this.handleFirsName}/>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="name-simple">Last Name</InputLabel>
						<Input  value={this.state.lastName}
						        onChange={this.handleLastName} />
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="name-simple">Date of birth</InputLabel>
						<Input  value={this.state.dob}
						        onChange={this.handleDob}
						        placeholder="dd.mm.yyyy"/>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="name-simple">Location</InputLabel>
						<Input value={this.state.location}
						       onChange={this.handleLocation} />
					</FormControl>
					<Button variant="outlined"
					        color="primary"
					        className={classes.button}
					        onClick={this.onSubmitHandler}
					        disabled={!isEnabled}>
						Submit
					</Button>
				</div>
			</div>
		)
	}
}
export default withStyles(styles)(Form);