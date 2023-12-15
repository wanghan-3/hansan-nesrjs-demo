import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verificationToken } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
import Register from "@/views/register";
// import AnimatedSwitch from "@/components/AnimatedSwitch/AnimatedSwitch";
class Router extends React.Component {
  render() {
    const { token, role, verificationToken } = this.props;
    console.log(role,'rolerolerole');
    return (
      <HashRouter>
        <Switch>
        <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login" />;
              } else {
                if (role) {
                  return <Layout />;
                } else {
                  verificationToken(token).then(() => <Layout />);
                }
              }
            }}
          />
          </Switch>
      </HashRouter>
    );
  }
}

export default connect((state) => state.user, { verificationToken })(Router);
