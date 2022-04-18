import axios from "axios";
import { useEffect, useState } from "react";

export interface ValidatorInfo {
  operator_address: string;
  hex_address: string;
  account_address: string;
  consensus_address: string;
  jailed: false;
  status: string;
  tokens: number;
  moniker: string;
  identity: "";
  avatar: string;
  commission: string;
  comulative_share: number;
  voting_power_percent: number;
  rank: number;
  uptime: number;
  isGenesis: boolean;
}

export interface AppState {
  accounts: [
    {
      address: string;
    }
  ];
}
export interface GenesisResult {
  auth: {
    app_state: AppState;
  };
}
export interface RpcGenesisResponse {
  jsonrpc: string;
  id: number;
  result: GenesisResult | undefined;
}

const useValidatorsNG = () => {
  const [genesis, setGenesis] = useState<AppState>();
  const [validators, setValidators] = useState<ValidatorInfo[]>();

  const loadGenesis = () => {
    axios.get("https://rpc.torii-1.archway.tech/genesis").then(
      (res) => {
        setGenesis(res.data.result.genesis.app_state.auth);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  useEffect(() => {
    loadGenesis();
  }, []);

  useEffect(() => {
    const getValidators = () => {
      if (genesis) {
        axios.get("https://archway.api.explorers.guru/api/validators").then(
          (res) => {
            setValidators(
              res.data.map((r: ValidatorInfo) => {
                return {
                  ...r,
                  isGenesis:
                    genesis.accounts
                      .map((a) => a.address)
                      .indexOf(r.account_address) > -1,
                };
              })
            );
          },
          (err) => {
            console.error(err);
          }
        );
      }
    };
    getValidators();
  }, [genesis]);

  return validators;
};

export default useValidatorsNG;
