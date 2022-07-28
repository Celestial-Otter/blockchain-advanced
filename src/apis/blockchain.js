import { ethers } from "ethers";

export const connectWallet = async () => {
  // connect to wallet
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected", accounts[0]);
  } catch (error) {
    console.log(error);
  }
};
