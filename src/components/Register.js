import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { lightBlue } from "@material-ui/core/colors";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid grey",
    borderRadius: 5,
    padding: theme.spacing(4),
    margin: "0 auto",
    textAlign: "center",
    marginTop: theme.spacing(8),
  },
  formControl: {
    display: "flex",
    marginBottom: theme.spacing(4),
  },
  helperText: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    backgroundColor: lightBlue[600],
    "&:hover": {
      backgroundColor: lightBlue[800],
    },
  },
  link: {
    color: "#EF7C00",
    textDecoration: "none",
  },
}));

const Register = ({ handleAlert, loggedIn, setLoggedIn }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    // Has to be an NUS email
    if (!email.includes("u.nus.edu")) {
      handleAlert("Please enter a valid NUS email", "error");
      setEmail("");
      setPassword("");
      return;
    }

    const url = `${
      window.location.hostname === "local.nusfitness.com"
        ? "http://local.nusfitness.com:5000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }register`;
    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((user) => {
        if (user._id) {
          handleAlert(
            "Successfully registered! Head to the profile section to sync with telegram!",
            "info"
          );
          setLoggedIn(true);
          history.push("/");
        } else {
          handleAlert("Failed to register, please try again! :(", "error");
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6">Register</Typography>
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            className={classes.input}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          onSubmit={onSubmit}
          disableElevation
          className={classes.button}
        >
          Register
        </Button>
      </form>
      <FormHelperText className={classes.helperText}>
        Already a user? Click{" "}
        <Link to="/login" className={classes.link}>
          here
        </Link>{" "}
        to login now!
      </FormHelperText>
    </Box>
  );
};

export default Register;
