import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';


const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const styles = theme => ({
	root: {
		width: '100%',
		margin: '50px auto',
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
		textAlign: 'left'
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		width: '100%'
	},
	head: {
		textAlign: 'left'
	}
});
const listUser = props => {
	const { classes } = props;
	return(
		<Paper className={classes.root}>
			<Table className={classes.table} title="Table">
			<TableHead>
				<TableRow>
					<CustomTableCell className={classes.head} numeric>First Name</CustomTableCell>
					<CustomTableCell className={classes.head} numeric>Last Name</CustomTableCell>
					<CustomTableCell className={classes.head} numeric>DOB</CustomTableCell>
					<CustomTableCell className={classes.head} numeric>Location</CustomTableCell>
					<CustomTableCell className={classes.head} numeric>Actions</CustomTableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{props.users.map(user => {
					return (
						<TableRow className={classes.row}
						          key={user.id} >
							<CustomTableCell component="th"
							                 scope="row"
							                 className={classes.head}>
								<Input id='firstName'
								       value={user.first_name}
								       className={classes.input}
								       disableUnderline={!user.editable}
								       onChange={(e) => {props.changeInputHandler(e.target, user.id)}}
								       readOnly={!user.editable}/>
							</CustomTableCell>
							<CustomTableCell numeric
							                 className={classes.head}>
								 <Input id='lastName'
								        value={user.last_name}
								        disableUnderline={!user.editable}
								        onChange={(e) => {props.changeInputHandler(e.target, user.id)}}
								        readOnly={!user.editable}className={classes.head}/>
							</CustomTableCell>
							<CustomTableCell className={classes.head}
							                 numeric>
								<Input id='dob'
								       value={user.dob}
								       disableUnderline={!user.editable}
								       onChange={(e) => {props.changeInputHandler(e.target, user.id)}}
								       readOnly={!user.editable}/>
							</CustomTableCell>
							<CustomTableCell className={classes.head}
							                 numeric>
								<Input id='location'
								       value={user.location}
								       disableUnderline={!user.editable}
								       onChange={(e) => {props.changeInputHandler(e.target, user.id)}}
								       readOnly={!user.editable}/>
							</CustomTableCell>
							<CustomTableCell className={classes.head}
							                 numeric>
								{
									user.editable ? <Button variant="fab"
									                        mini color="primary"
									                        aria-label="Edit"
									                        onClick={() => props.saveUserHandler(user.id)}
									                        className={classes.button}>
									<AddIcon/>
								</Button> : <Button variant="fab"
									                mini color="primary"
									                aria-label="Edit"
									                onClick={() => props.editUserHandler(user.id)}
									                className={classes.button}>
									<EditIcon/>
								</Button>
								}
								<Button variant="fab"
								        mini color="secondary"
								        aria-label="Delete"
								        onClick={() => props.deleteUserHandler(user.id)}
								        disabled={user.editable}
								        className={classes.button}>
									<DeleteIcon />
								</Button>
							</CustomTableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	</Paper>
)}
export default withStyles(styles)(listUser);