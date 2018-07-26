import React from 'react';
import moment from 'moment'

const Summary = props => {
	const usersFromKiev = props.users.filter(function (user) {
		return user.location.toLowerCase() === 'kiev'
	})
	const longestNames = [...props.users]
	longestNames.sort(function (a ,b) {
		return (b.first_name + b.last_name).length - (a.first_name + a.last_name).length
	})
	var sum = 0
	if(props.users.length > 2){
		const usersAge = []
		for (let i = 0;i < props.users.length;i++){
			usersAge.push(parseInt(moment(props.users[i].dob, "DD.MM.YYYY").fromNow()))
		}
		usersAge.sort(function (a, b) {
			return b - a
		})
		let counter = 3
		while(counter !== 0){
			sum += Math.max(...usersAge)
			usersAge.shift()
			counter--
		}
	} else {
		for(let i = 0; i < props.users.length; i++){
			sum += parseInt(moment(props.users[i].dob, "DD.MM.YYYY").fromNow())
		}
	}
		return(
			<div>
				<h1>Summary</h1>
				<div>Count of users from Kiev or kiev: {usersFromKiev.length}</div>
				<div>Sum of three oldest user ages: {sum}</div>
				{
					longestNames[0] ? <div>Longest string of first name + last name: {longestNames[0].first_name + ' ' + longestNames[0].last_name}</div> : null
				}

			</div>
		)
}
export default Summary