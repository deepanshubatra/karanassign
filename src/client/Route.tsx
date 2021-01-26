import 'url-search-params-polyfill';
import * as React from "react";

import { Route, Router } from 'react-router'; // Adds Routing capabilities
import { browserHistory } from 'react-router';
import RoleDefComponent from './Routes/RoleDef/Components';
import PageNotFoundComponent from './Routes/PageNotFound';
import { Provider } from "react-redux";
import configureStore from "./redux/store/Store";

const store = configureStore();
export default class MainRouter extends React.Component {
componentDidMount(){
  console.log("Mehal tandk")
}
  render() {
    return (
      <Provider store={store}>
        <Router history= {browserHistory}>
            <Route path="/roleDefs" component={(props: any)=>(<RoleDefComponent {...props}></RoleDefComponent>)} />
            <Route path="*" component={PageNotFoundComponent} />
        </Router>
        </Provider>
    );
  }
}
