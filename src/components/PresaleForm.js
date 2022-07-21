import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const PresaleForm = () => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [priceValue, setPriceValue] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const onPriceChange = (e) => setPriceValue(e.target.value);
  const onTokenAmountChange = (e) => setTokenAmount(e.target.value);
  const onTokenAddressChange = (e) => setTokenAddress(e.target.value);
  const handleSubmit = () => console.log(priceValue);
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setPriceValue("");
    setTokenAmount("");
    setTokenAddress("");
  };

  return (
    <Paper>
      <h2>PresaleForm</h2>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Set Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Set End Date"
          value={endDate}
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
