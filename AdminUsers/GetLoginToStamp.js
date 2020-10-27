import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

class GetLoginToStamp extends React.Component {
    constructor(props) {
      super(props);

      let url = new URL(window.location.href);
      let redirect = 'http://' + (window.location.hostname) + ':8080';

      this.state = {
        apiState: url.searchParams.get("state") ?? null,
        code: url.searchParams.get("code") ?? null,
        adminUser: null,
        token: null,
        postResponse: null,
        yourIp: props.yourIp,
        redirect: redirect
      };

    }

    componentDidMount() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              state: this.state.apiState,
              code: this.state.code,
              ip: this.state.yourIp,
              redirect_uri: this.state.redirect
            })
        };

        // The below required that I disable CORS in safari in order to work correctly
        fetch('http://dev.api.frontier.com/admin-user/login-by-stamp', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ adminUser: JSON.stringify(data.admin_user), token: JSON.stringify(data.token)}))
            .catch(error => this.setState({
                isLoading: false,
                message: 'Something bad happened: ' + error
        }));
    }

    render() {
        const { apiState, code, adminUser, token, yourIp, message } = this.state;

        if (adminUser) {
            let accessToken = token.substring(
              token.lastIndexOf("access_token\":\"") + 15,
              token.lastIndexOf("\",\"permissions")
            );

            return (
                <div className="card text-center m-3">
                  <div className="card-body">
                      <p>yourIp2: {JSON.stringify(yourIp)}</p>
                      <p>State: {apiState}</p>
                      <p>Code: {code}</p>

                      <Link to={ `/offers/${accessToken}`}>
                        See Offers
                      </Link>

                      <p>accessToken: {accessToken}</p>
                      <p>adminUser: {adminUser}</p>
                      <p>token: {token}</p>
                  </div>
                </div>
            )
        } else if (message) {
            return (
                <div className="card text-center m-3">
                    <h3>Error: {message}</h3>
                </div>
            );
        } else {
            return (
                <div className="card text-center m-3">
                  Please login to STAMP to access the Frontier API
                </div>
            );
        }
    }
}

export { GetLoginToStamp };