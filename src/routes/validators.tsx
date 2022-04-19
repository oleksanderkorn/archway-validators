import { fromHex } from "@cosmjs/encoding";
import { Link, Outlet } from "react-router-dom";
import { Bech32 } from "@cosmjs/encoding";
import useValidatorsNG from "../api/useValidators";

export default function Validators() {
  // const { validators } = useRpc();
  const validators = useValidatorsNG();
  // const toArchway = (hex: string) => {
  //   return Bech32.encode("archway", fromHex(hex));
  // };

  return (
    <main
      style={{ padding: "1rem 0" }}
      className="text-slate-900 dark:text-white"
    >
      <h2>
        Total Active (
        {validators
          ? validators.filter((v) => v.status === "BOND_STATUS_BONDED").length
          : 0}
        )
      </h2>
      <div className="flex justify-center">
        <div className="m-2">
          <h2>
            Pre-Genesis (
            {validators
              ? validators.filter(
                  (v) => v.status === "BOND_STATUS_BONDED" && v.isGenesis
                ).length
              : 0}
            )
          </h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-left">Moniker</th>
                <th className="text-left">Address</th>
                {/* <th className="text-right">Voting Power</th> */}
                <th className="text-left">Balance</th>
                {/* <th className="text-right">From genesis</th> */}
              </tr>
            </thead>
            <tbody>
              {validators &&
                validators
                  .filter(
                    (v) => v.status === "BOND_STATUS_BONDED" && v.isGenesis
                  )
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((v, key) => {
                    return (
                      <tr key={key}>
                        <td className="text-left">{v.moniker}</td>
                        <td className="text-left">
                          {/* <Link
                          className="text font-extralight hover:font-light"
                          to={`/validators/${v.account_address}`}
                        > */}
                          {v.account_address}
                          {/* </Link> */}
                        </td>
                        {/* <td className="text-right">{v.voting_power_percent}%</td> */}
                        <td className="text-left">{v.tokens}</td>
                        {/* <td className="text-right">
                          {v.isGenesis ? "Yes" : "No"}
                        </td> */}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <div className="m-2">
          <h2>
            Post-Genesis (
            {validators
              ? validators.filter(
                  (v) => v.status === "BOND_STATUS_BONDED" && !v.isGenesis
                ).length
              : 0}
            )
          </h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-left">Moniker</th>
                <th className="text-left">Address</th>
                {/* <th className="text-right">Voting Power</th> */}
                <th className="text-left">Balance</th>
              </tr>
            </thead>
            <tbody>
              {validators &&
                validators
                  .filter(
                    (v) => v.status === "BOND_STATUS_BONDED" && !v.isGenesis
                  )
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((v, key) => {
                    return (
                      <tr key={key}>
                        <td className="text-left">{v.moniker}</td>
                        <td className="text-left">
                          {/* <Link
                          className="text font-extralight hover:font-light"
                          to={`/validators/${v.account_address}`}
                        > */}
                          {v.account_address}
                          {/* </Link> */}
                        </td>
                        {/* <td className="text-right">{v.voting_power_percent}%</td> */}
                        <td className="text-left">{v.tokens}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </main>
  );
}
