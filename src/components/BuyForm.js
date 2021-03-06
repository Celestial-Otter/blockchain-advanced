import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Alert from "@mui/material/Alert";

const BuyForm = () => {
  const [ID, setID] = React.useState("");
  const [tokenAmount, setTokenAmount] = React.useState("");

  const onIDChange = (e) => setID(e.target.value);
  const onTokenAmountChange = (e) => setTokenAmount(e.target.value);

  const [isError, setError] = useState(false);

  const handleSubmit = () => {
    if (ID && tokenAmount) {
      console.log("submit");
      setError(false);
    } else {
      setError(true);
      console.log("error");
    }
  };

  const handleReset = () => {
    setID("");
    setTokenAmount("");
    setError(false);
  };

  //Error Message for missing fields
  let errorAlert;
  if (isError) {
    errorAlert = <Alert severity="error">Please fill all fields</Alert>;
  } else {
    errorAlert = null;
  }

  return (
    <Paper>
      <h1>Buy Form</h1>
      {errorAlert}

      <TextField
        onChange={onIDChange}
        value={ID}
        label={"Presale ID"}
        required
      />
      <TextField
        onChange={onTokenAmountChange}
        value={tokenAmount}
        label={"Token Amount"}
        required
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Paper>
  );
};

export default BuyForm;
