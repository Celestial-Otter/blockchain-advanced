import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Alert from "@mui/material/Alert";

const EndPresaleForm = () => {
  const [ID, setID] = React.useState("");

  const onIDChange = (e) => setID(e.target.value);

  const [isError, setError] = useState(false);

  const handleSubmit = () => {
    if (ID) {
      console.log("submit");
      setError(false);
    } else {
      setError(true);
      console.log("error");
    }
  };

  const handleReset = () => {
    setID("");
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
      <h1>End Presale Form</h1>
      {errorAlert}

      <TextField
        onChange={onIDChange}
        value={ID}
        label={"Presale ID"}
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

export default EndPresaleForm;
