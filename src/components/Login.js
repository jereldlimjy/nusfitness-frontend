import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
        maxWidth: "350px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid grey",
        padding: theme.spacing(4),
        margin: "0 auto",
        textAlign: "center",
        marginTop: theme.spacing(8),
    },
    formControl: {
        display: "flex",
        marginBottom: theme.spacing(4)
    },
    helperText: {
        textAlign: "center",
        marginTop: theme.spacing(2)
    },
    link: {
        color: "#EF7C00",
        textDecoration: "none"
    }
}));

const Login = ({ handleAlert, loggedIn, setLoggedIn }) => {
    const classes = useStyles();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    let history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        fetch('https://salty-reaches-24995.herokuapp.com/login', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(response  => response.json())
        .then(data => {
            if (data.success) {
                handleAlert('Successfully logged in!', 'success');
                setLoggedIn(true);
                history.push('/');
            }
        })
        .catch(err => {
            handleAlert('Failed to login, please try again! :(', 'error');
            setEmail("");
            setPassword("");
        })
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6">Login</Typography>
            <form onSubmit={onSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </FormControl>

                <Button variant="contained" type='submit' onSubmit={onSubmit} disableElevation>
                    Login
                </Button>
            </form>
            <FormHelperText className={classes.helperText}>New user? Click <Link to='/register' className={classes.link}>here</Link> to register now!</FormHelperText>
        </Box>
    )
}

export default Login;