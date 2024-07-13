/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import ImportWarehouse from "./pages/ImportWarehouse";
import ExportWarehousePage from "./pages/ExportWarehousePage";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <Switch>
        {/* <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} /> */}
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/import" component={ImportWarehouse} />
          <Route exact path="/export" component={ExportWarehousePage} />

          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
