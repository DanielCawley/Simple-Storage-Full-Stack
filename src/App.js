import logo from "./logo.svg";
import "./App.css";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import SimpleStorage from "./artifacts/contracts/SimpleStorage.sol/SimpleStorage.json";
import { ethers } from "ethers";

const simpleStorageAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

function App() {
  // ! CALLING SETTER FUNCTION
  const [newNumValue, setNewNumValue] = useState(0);
  const [numberValueFromBlockchain, setNumberValueFromBlockchain] =
    useState(-1);

  const handleSubmit = (event) => {
    // event.preventDefault();
    setNewNumValue(event.target.value);
  };

  function setNewValueCall(event) {
    event.preventDefault();
    console.log("hi");
    callFunction();
  }

  const callFunction = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        simpleStorageAddress,
        SimpleStorage.abi,
        signer
      );
      console.log("contract object has been made");
      try {
        const tx = await contract.setNum(newNumValue);
        console.log("tx: ", tx);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
    console.log("hello world");
  };

  // !CALLING GETTER FUNCTION
  const getNumValue = async (event) => {
    if (typeof window.ethereum !== "undefined") {
      event.preventDefault();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        simpleStorageAddress,
        SimpleStorage.abi,
        provider
      );
      console.log("contract created");
      provider.getCode(simpleStorageAddress);
      const nValueFromBlockchain = await contract.returnNum();
      console.log("Balance: ", nValueFromBlockchain.toString());
      setNumberValueFromBlockchain(nValueFromBlockchain);
    }
  };

  return (
    <div className="App">
      <br />
      <form onSubmit={setNewValueCall}>
        <center>
          <TextField
            label="new number"
            variant="outlined"
            type="number"
            onChange={handleSubmit}
            placeholder="new num value"
          ></TextField>
          <Button type="submit" color="secondary" variant="contained">
            set new number
          </Button>
        </center>
      </form>

      <br />

      <form onSubmit={getNumValue}>
        <Button type="submit" color="secondary" variant="contained">
          get number
        </Button>
        <h3>
          Current value:{" "}
          {numberValueFromBlockchain.toString() == -1
            ? "No number has been input yet"
            : numberValueFromBlockchain.toString()}
        </h3>
      </form>
    </div>
  );
}

export default App;
