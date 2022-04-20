import logo from "./logo.svg";
import { Outlet, Link } from "react-router-dom";

import "./App.css";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { ToriiInfo } from "./chain.info.torii";
import { useState } from "react";
import { AccountData, OfflineSigner } from "@cosmjs/proto-signing";
import { fromHex } from "@cosmjs/encoding";
import { useMatch } from "react-router-dom";

declare global {
  interface Window {
    keplr: any;
    getOfflineSigner: (chainId: string) => OfflineSigner;
  }
}

window.keplr = window.keplr || {};

function App() {
  const RPC = ToriiInfo.rpc;
  const ContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const [rpc] = useState(RPC);
  const [contract, setContract] = useState(ContractAddress);
  const [chainMeta] = useState(ToriiInfo);
  const [cwClient, setCwClient] = useState<SigningCosmWasmClient>();
  const [offlineSigner, setOfflineSigner] = useState<OfflineSigner>();
  const [gasPrice, setGasPrice] = useState<GasPrice>();
  const [loadingStatus, setLoadingStatus] = useState();
  const [loadingMsg, setLoadingMsq] = useState("");
  const [logs, setLogs] = useState([]);
  const [accounts, setAccounts] = useState<readonly AccountData[]>();
  const [userAddress, setUserAddress] = useState<string>();
  const isInactive = useMatch("inactive");
  const connectWallet = async () => {
    try {
      if (window) {
        if (window.keplr) {
          if (window.keplr["experimentalSuggestChain"]) {
            await window.keplr.experimentalSuggestChain(chainMeta);
            await window.keplr.enable(chainMeta.chainId);
            let offSigner = await window.getOfflineSigner(chainMeta.chainId);
            setOfflineSigner(offSigner);
            console.log("offlineSigner", offlineSigner);
            let cwc = await SigningCosmWasmClient.connectWithSigner(
              rpc,
              offSigner
            );
            setCwClient(cwc);
            setAccounts(await offSigner.getAccounts());
            setGasPrice(GasPrice.fromString("0.002utorii"));
            if (accounts) {
              setUserAddress(accounts[0].address);
            }

            // Debug
            console.log("dApp Connected", {
              accounts: accounts,
              userAddress: userAddress,
              client: cwClient,
              gasPrice: gasPrice,
              offlineSigner: offlineSigner,
            });

            // // Get count
            // let counter = await this.getCount();
            // try {
            //   if (!isNaN(counter.count)) {
            //     this.setState({ counter: counter.count });
            //   } else {
            //     console.warn(
            //       "Error expected numeric value from counter, found: ",
            //       typeof counter.count
            //     );
            //   }
            // } catch (e) {
            //   console.warn("Error: failed getting counter value", e);
            // }
          } else {
            console.warn(
              "Error access experimental features, please update Keplr"
            );
          }
        } else {
          console.warn("Error accessing Keplr");
        }
      } else {
        console.warn("Error parsing window object");
      }
    } catch (e) {
      console.error("Error connecting to wallet", e);
    }
  };

  return (
    <div className="text-center bg-white dark:bg-slate-900 w-fit sm:w-auto">
      <header className="flex justify-center items-center">
        <Link to="/">
          <img src={logo} className="m-3" alt="logo" />
        </Link>
        {/* <h1 className="text-3xl font-bold ml-2 mr-2 text-slate-900 dark:text-white">
          Search 🔎
        </h1> */}
        {/* {!userAddress && (
          <button
            id="connect"
            className="btn text-2xl font-extralight mr-3 hover:font-light text-slate-900 dark:text-white"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        {userAddress && (
          <h4 className="text-xl font-bold ml-2 mr-2 text-slate-900 dark:text-white">
            {userAddress}
          </h4>
        )} */}
      </header>
      <header className="flex justify-center items-center">
        <nav className="flex flex-row">
          <Link
            className={`text-2xl ${
              isInactive ? "font-extralight" : "font-light"
            } mr-3 hover:text-purple-900 hover:dark:text-purple-300 text-slate-900 dark:text-white`}
            to="/validators"
          >
            Active Validators
          </Link>
          <Link
            className={`text-2xl ${
              isInactive ? "font-light" : "font-extralight"
            } mr-3 hover:text-purple-900 hover:dark:text-purple-300 text-slate-900 dark:text-white`}
            to="/inactive"
          >
            Inactive Validators
          </Link>
          {/* <Link
            className="text-2xl font-extralight mr-3 hover:font-light text-slate-900 dark:text-white"
            to="/blocks"
          >
            Blocks
          </Link> */}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
function toBech32(arg0: string, arg1: Uint8Array) {
  throw new Error("Function not implemented.");
}
