import "./App.css";
import PresaleForm from "./components/PresaleForm";
import BuyForm from "./components/BuyForm";
import WithdrawForm from "./components/WithdrawForm";
import EndPresaleForm from "./components/EndPresaleForm";

function App() {
  return (
    <div className="App">
      <PresaleForm />

      <BuyForm />

      <WithdrawForm />

      <EndPresaleForm />
    </div>
  );
}

export default App;
