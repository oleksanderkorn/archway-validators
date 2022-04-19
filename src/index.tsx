import { Routes, Route, HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Validators from "./routes/validators";
import InactiveValidators from "./routes/inactives";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement!);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="blocks" element={<Blocks />} /> */}
        <Route path="validators" element={<Validators />} />
        <Route path="inactive" element={<InactiveValidators />} />
        {/* <Route path="validators/:address" element={<Validator />} /> */}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p className="text-xl font-light ml-2 mr-2 text-slate-900 dark:text-white flex-none">
                There's nothing here!
              </p>
            </main>
          }
        />
      </Route>
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
