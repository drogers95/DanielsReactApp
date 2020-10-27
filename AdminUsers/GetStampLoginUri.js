import React from 'react';
import { GetLoginToStamp } from "./GetLoginToStamp";


class GetStampLoginUri extends React.Component {
    constructor(props) {
      super(props);

      let redirect = 'http://' + (window.location.hostname) + ':8080';

      this.state = {
          loginUri: null,
          yourIp: null,
          redirect: redirect
      };

    }

    componentDidMount() {
        // Get STAMP login URI
        fetch('http://dev.api.frontier.com/admin-user/stamp-login-uri?redirect_uri=' + this.state.redirect)
            .then(response => response.json())
            .then(data => this.setState({ loginUri: data.login_uri, yourIp: data.your_ip }))
            .catch(error => this.setState({
                isLoading: false,
                message: 'Something bad happened: ' + error
        }));
    }

    render() {
        const { loginUri, yourIp, redirect, message } = this.state;

        if (yourIp) {
            return (
              <div className="card text-center m-3">
                  <div className="card-body">
                    <p>yourIp: {yourIp}</p>
                    <p>redirect URL: {redirect}</p>
                    <a target="_blank" href={loginUri}>Login to STAMP</a>
                  </div>
                  <GetLoginToStamp yourIp={yourIp} />
              </div>
            )
        } else if (message) {
            return (
                <div className="card-body">
                  <p>yourIp: {yourIp}</p>
                  <p>loginUri: {loginUri}</p>
                  <a target="_blank" href={loginUri}>Login to STAMP</a>

                  <h3>Error: {message}</h3>
                </div>
            );
        } else {
            return (
                <div className="card-body">
                  <p>yourIp: {yourIp}</p>
                  <p>loginUri: {loginUri}</p>
                  <a target="_blank" href={loginUri}>Login to STAMP</a>
                </div>
            );
        }
    }
}

export { GetStampLoginUri };