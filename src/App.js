import "./App.css";
import PresaleForm from "./components/PresaleForm";
import BuyForm from "./components/BuyForm";
import WithdrawForm from "./components/WithdrawForm";

function App() {
  return (
    <div className="App">
      <PresaleForm />

      <BuyForm />

      <WithdrawForm />
    </div>
  );
}

export default App;
