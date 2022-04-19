import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Outlet } from "react-router-dom";
import useValidatorsNG from "../api/useValidators";
import { roundBalance } from "../util/utils";

export default function InactiveValidators() {
  const validators = useValidatorsNG();

  let [copiedAddress, setCopiedAddress] = useState("");

  const onCopyDone = (addr: string) => {
    setCopiedAddress(addr);
    setTimeout(() => {
      setCopiedAddress("");
    }, 500);
  };

  return (
    <main
      style={{ padding: "1rem 0" }}
      className="text-slate-900 dark:text-white"
    >
      <h2>
        Total Inactive (
        {validators
          ? validators.filter((v) => v.status !== "BOND_STATUS_BONDED").length
          : 0}
        )
      </h2>
      <div className="flex justify-center flex-wrap">
        <div className="m-2">
          <h2>
            Pre-Genesis (
            {validators
              ? validators.filter(
                  (v) => v.status !== "BOND_STATUS_BONDED" && v.isGenesis
                ).length
              : 0}
            )
          </h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-left pr-1">Rank</th>
                <th className="text-left pr-2">Moniker</th>
                <th className="text-left">Address</th>
                <th className="text-left">Balance</th>
              </tr>
            </thead>
            <tbody>
              {validators &&
                validators
                  .filter(
                    (v) => v.status !== "BOND_STATUS_BONDED" && v.isGenesis
                  )
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((v, key) => {
                    return (
                      <tr key={key}>
                        <td className="text-left pr-1">{key + 1}</td>
                        <td className={`text-left pr-2`}>
                          {v.moniker}{" "}
                          {v.jailed && (
                            <span className="text-red-500">(Jailed)</span>
                          )}
                        </td>
                        <td className="text-left relative">
                          <CopyToClipboard
                            text={v.account_address}
                            onCopy={() => onCopyDone(v.account_address)}
                          >
                            <p className="cursor-pointer hover:text-purple-900 hover:dark:text-purple-300">
                              {v.account_address}
                            </p>
                          </CopyToClipboard>
                          <Transition
                            as={Fragment}
                            show={copiedAddress === v.account_address}
                            enter="transform transition duration-[200ms]"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="transform duration-200 transition ease-in-out"
                            leaveFrom="opacity-100 scale-100 "
                            leaveTo="opacity-0 scale-95 "
                          >
                            <div className="absolute cursor-default top-[0px] left-[-60px] px-1 py-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200">
                              Copied
                            </div>
                          </Transition>
                        </td>
                        <td className="text-left">{roundBalance(v.tokens)}</td>
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
                  (v) => v.status !== "BOND_STATUS_BONDED" && !v.isGenesis
                ).length
              : 0}
            )
          </h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-left pr-1">Rank</th>
                <th className="text-left pr-2">Moniker</th>
                <th className="text-left">Address</th>
                <th className="text-left">Balance</th>
              </tr>
            </thead>
            <tbody>
              {validators &&
                validators
                  .filter(
                    (v) => v.status !== "BOND_STATUS_BONDED" && !v.isGenesis
                  )
                  .sort((a, b) => (a < b ? -1 : 1))
                  .map((v, key) => {
                    return (
                      <tr key={key}>
                        <td className="text-left pr-1">{key + 1}</td>
                        <td className="text-left pr-2">
                          {v.moniker}{" "}
                          {v.jailed && (
                            <span className="text-red-500">(Jailed)</span>
                          )}
                        </td>
                        <td className="text-left relative">
                          <CopyToClipboard
                            text={v.account_address}
                            onCopy={() => onCopyDone(v.account_address)}
                          >
                            <p className="cursor-pointer hover:text-purple-900 hover:dark:text-purple-300">
                              {v.account_address}
                            </p>
                          </CopyToClipboard>
                          <Transition
                            as={Fragment}
                            show={copiedAddress === v.account_address}
                            enter="transform transition duration-[200ms]"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="transform duration-200 transition ease-in-out"
                            leaveFrom="opacity-100 scale-100 "
                            leaveTo="opacity-0 scale-95 "
                          >
                            <div className="absolute cursor-default top-[0px] left-[-60px] px-1 py-1 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200">
                              Copied
                            </div>
                          </Transition>
                        </td>
                        <td className="text-left">{roundBalance(v.tokens)}</td>
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
