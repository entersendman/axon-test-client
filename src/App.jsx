import React, {Component} from 'react';
import UsersTable from './Table/UsersTable';
import Summary from './Summary/Summary'
import Form from './Form/Form'

class App extends Component {
  state = {
    users: []
  };
	componentDidMount() {
		fetch('/users')
			.then(res => res.json())
			.then(users => this.setState({
				users: users
			}))
	}
	updateData = (users) => {
		this.setState({ users: users })
	}

	render() {
	  const {users} = this.state
    return (
      <div>
        <UsersTable users={users} updateData={this.updateData}/>
        <Summary users={users}/>
        <Form users={users} updateData={this.updateData}/>
      </div>
    );
  }
}

export default App;
