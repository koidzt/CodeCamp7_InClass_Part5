import React from 'react';
import RolesList from '../../config/roles';
import { Switch, Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import NavBar from '../../components/NavBar/NavBar';

function PrivateRoutes(props) {
  const role = props.role || "GUEST";

  return (
    <>
      { role !== "GUEST" ? <NavBar /> : null}
      <Switch>
        {RolesList[role].map(({ path, page: PageComponent }) => <Route exact path={path}>
          <PageComponent setRole={props.setRole} />
        </Route>)}
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default PrivateRoutes;
