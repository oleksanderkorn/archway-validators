import { fromHex } from "@cosmjs/encoding";
import { useParams } from "react-router-dom";
import useRpc from "../api/useRpc";
import { Bech32 } from "@cosmjs/encoding";

export default function Validator() {
  let params = useParams();
  return (
    <main
      style={{ padding: "1rem 0" }}
      className="text-slate-900 dark:text-white"
    >
      <h4 className="text-xl font-bold ml-2 mr-2 text-slate-900 dark:text-white flex-none">
        Validator Address: {params.address}
      </h4>
    </main>
  );
}
