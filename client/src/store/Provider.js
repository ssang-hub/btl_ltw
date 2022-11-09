import { useState } from "react";
import { AppName } from "../config/variable";
import Context from "./Context";

// state logged và setLogged là state để giúp xác định là đã login chưa
function Provider({ children }) {
  const [logged, setLogged] = useState(JSON.parse(localStorage.getItem(AppName)) ? true : false);

  return <Context.Provider value={[logged, setLogged]}>{children}</Context.Provider>;
}

export default Provider;
