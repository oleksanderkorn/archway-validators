import axios from "axios";
import { useEffect, useState } from "react";

export interface ValidatorInfo {
  address: string;
  pub_key: {
    type: string;
    value: string;
  };
  voting_power: number;
  proposer_priority: number;
}

export interface RpcValidatorsResult {
  block_height: number;
  validators: [ValidatorInfo];
}

export interface RpcValidatorsResponse {
  jsonrpc: string;
  id: number;
  result: RpcValidatorsResult | undefined;
  error: RpcError | undefined;
}

export interface RpcError {
  code: number;
  message: string;
  data: string;
}

const useRpc = () => {
  const [validators, setValidators] = useState<RpcValidatorsResponse>();
  useEffect(() => {
    getValidators();
  }, []);

  const getValidators = () => {
    axios
      .get("https://rpc.torii-1.archway.tech/validators?page=1&per_page=130")
      .then(
        (res) => {
          setValidators(res.data);
        },
        (err) => {
          setValidators(err.data);
        }
      );
  };

  return { validators };
};

export default useRpc;
