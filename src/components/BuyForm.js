import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Paper,
  MenuItem,
  Select,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";

const BuyForm = () => {
  const [ID, setID] = React.useState("");
  const [tokenAmount, setTokenAmount] = React.useState("");
  const [mantissa, setMantissa] = React.useState("");

  const onIDChange = (e) => setID(e.target.value);
  const onTokenAmountChange = (e) => setTokenAmount(e.target.value);
  const onMantissaChange = (e) => setMantissa(e.target.value);

  const [isError, setError] = useState(false);

  const handleSubmit = () => {
    if (ID && tokenAmount && mantissa) {
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
    setMantissa("");
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
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Mantissa
        </InputLabel>
        <Select value={mantissa} label={"Mantissa"} onChange={onMantissaChange}>
          <MenuItem value={1}>1</MenuItem> //0 decimal places
          <MenuItem value={10}>0.1</MenuItem> //1 decimal place
          <MenuItem value={100}>0.01</MenuItem> //2 decimal places
          <MenuItem value={1000}>0.001</MenuItem> //3 decimal places
          <MenuItem value={10000}>0.0001</MenuItem> //4 decimal places
          <MenuItem value={100000}>0.00001</MenuItem> //5 decimal places
          <MenuItem value={1000000}>0.000001</MenuItem> //6 decimal places
          <MenuItem value={10000000}>0.0000001</MenuItem> //7 decimal places
          <MenuItem value={100000000}>0.00000001</MenuItem> //8 decimal places
          <MenuItem value={1000000000}>0.000000001</MenuItem> //9 decimal places
          <MenuItem value={10000000000}>0.0000000001</MenuItem> //10 decimal
          places
          <MenuItem value={100000000000}>0.00000000001</MenuItem> //11 decimal
          places
          <MenuItem value={1000000000000}>0.000000000001</MenuItem> //12 decimal
          places
          <MenuItem value={10000000000000}>0.0000000000001</MenuItem> //13
          decimal places
          <MenuItem value={100000000000000}>0.00000000000001</MenuItem> //14
          decimal places
          <MenuItem value={1000000000000000}>0.000000000000001</MenuItem> //15
          decimal places
          <MenuItem value={10000000000000000}>0.0000000000000001</MenuItem> //16
          decimal places
          <MenuItem value={100000000000000000}>
            0.00000000000000001
          </MenuItem>{" "}
          //17 decimal places
          <MenuItem value={1000000000000000000}>
            0.000000000000000001
          </MenuItem>{" "}
          //18 decimal places
        </Select>
      </FormControl>

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
