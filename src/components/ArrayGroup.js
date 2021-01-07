import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ArrayGroup = () => {
  const classes = useStyles();
  const [arrayItems, setarrayItems] = useState(5);
  const [arrayGroups, setarrayGroups] = useState(3);
  const [formIsValid, setFormIsValid] = useState(false);
  const [originalArray, setoriginalArray] = useState([]);
  const [groupedResult, setgroupedResult] = useState([]);

  useEffect(() => {
    // let tempArray = [...Array(arrayItems).keys()];
    let tempArray = [];
    let totalVal = arrayItems;
    while (totalVal--) {
      tempArray.unshift(totalVal);
    }
    setoriginalArray(tempArray);
    let allFieldsValid = arrayItems > 0 && arrayGroups > 0;
    if (allFieldsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [arrayItems, arrayGroups]);

  const calculateGroups = () => {
    let resultArray = [];
    let size = 0;
    let idx = 0;
    let groupNo = arrayGroups;
    if (arrayGroups < 2) setgroupedResult([originalArray]);
    if (arrayItems % arrayGroups === 0) {
      size = Math.floor(arrayItems / arrayGroups);
      while (idx < arrayItems) {
        resultArray.push(originalArray.slice(idx, (idx += size)));
      }
    } else {
      groupNo--;
      size = Math.floor(arrayItems / groupNo);
      if (arrayItems % size === 0) {
        size--;
      }
      while (idx < size * groupNo) {
        resultArray.push(originalArray.slice(idx, (idx += size)));
      }
      resultArray.push(originalArray.slice(size * groupNo));
    }
    // for (let index = arrayGroups; index > 0; index++) {
    //   resultArray.push(
    //     originalArray.splice(0, Math.ceil(originalArray.length / index))
    //   );
    //   console.log("resultArray", resultArray);
    // }
    setgroupedResult(resultArray);
  };

  const fieldHandler = (value, fieldname) => {
    if (fieldname === "arrayItems") {
      setarrayItems(value);
    } else if (fieldname === "arrayGroups") {
      setarrayGroups(value);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    calculateGroups();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="secondary">
          Return the contents of the array divided into N equally sized arrays.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id="arrayItems"
            label="Enter Number of Array Items"
            name="arrayItems"
            autoComplete="arrayItems"
            autoFocus
            value={arrayItems}
            onChange={(evt) => fieldHandler(evt.target.value, "arrayItems")}
          />
          <Typography variant="h6" gutterBottom color="secondary">
            Original Array: {JSON.stringify(originalArray)}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            name="arrayGroups"
            label="Enter Number of Array Groups"
            id="arrayGroups"
            value={arrayGroups}
            onChange={(evt) => fieldHandler(evt.target.value, "arrayGroups")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formIsValid}
            onClick={handleSubmit}
          >
            Calculate
          </Button>
        </form>
        <Typography variant="h6" gutterBottom color="secondary">
          Grouped Array: {JSON.stringify(groupedResult)}
        </Typography>
      </div>
    </Container>
  );
};

export default ArrayGroup;
