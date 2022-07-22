import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Alert from "@mui/material/Alert";

var moment = require("moment");

const PresaleForm = () => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [priceValue, setPriceValue] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const [isError, setError] = useState(false);

  const onPriceChange = (e) => setPriceValue(e.target.value);
  const onTokenAmountChange = (e) => setTokenAmount(e.target.value);
  const onTokenAddressChange = (e) => setTokenAddress(e.target.value);
  const handleSubmit = () => {
    if (startDate && endDate && priceValue && tokenAmount && tokenAddress) {
      console.log(
        "startDate: ",
        startDate.toISOString(),
        "endDate: ",
        endDate.toISOString(),
        "priceValue: ",
        priceValue,
        "tokenAmount: ",
        tokenAmount,
        "tokenAddress: ",
        tokenAddress
      );
      setError(false);
    } else {
      setError(true);
      console.log("error");
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setPriceValue("");
    setTokenAmount("");
    setTokenAddress("");
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
      <h2>PresaleForm</h2>
      {errorAlert}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Set Start Date"
          value={startDate}
          minDate={moment(new Date())}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Set End Date"
          value={endDate}
          minDate={moment(new Date())}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
        />
      </LocalizationProvider>
      <TextField onChange={onPriceChange} value={priceValue} label={"Price"} />
      <TextField
        onChange={onTokenAmountChange}
        value={tokenAmount}
        label={"Token Amount"}
      />
      <TextField
        onChange={onTokenAddressChange}
        value={tokenAddress}
        label={"Token Address"}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
    </Paper>
  );
};

export default PresaleForm;
