import React from 'react';
import { Alert as MuiAlert } from '@material-ui/lab';

const Alert = ({ alert }) => {
	return (
		alert !== null && (
			<MuiAlert severity={alert.type}>{alert.msg}</MuiAlert>
		)
	)
}

export default Alert;