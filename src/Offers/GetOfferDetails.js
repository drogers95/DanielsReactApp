import React from 'react';
import { Link } from "react-router-dom";

class GetOfferDetails extends React.Component {
    constructor (props) {
        super(props);

        let url = new URL(window.location.href).toString();
        let res = url.split("/");
        let pos = res.indexOf('getOfferDetails');
        let token = res[pos + 1];
        let uuid = res[pos + 2];

        console.log('token: ' + token);
        console.log('uuid: ' + uuid);

        this.state = {
            offer: null,
            accessToken: token,
            uuid: uuid
        };

    }

    componentDidMount () {

        const requestOptions = {
          method: 'GET',
          withCredentials: true,
          headers: new Headers({
            'Authorization': 'Bearer ' + this.state.accessToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        };

        fetch('http://dev.api.frontier.com/offer/' + this.state.uuid, requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ offer: JSON.stringify(data.offer) }))
          .catch(error => this.setState({
            isLoading: false,
            message: 'Something bad happened: ' + error
        }));
    }

    render () {
      const { offer, accessToken, message, uuid } = this.state;

      if (offer) {

          return (
            <div className="card text-center m-3">
                <p>Access Token: {accessToken}</p>
                <p>Offer UUID: {uuid}</p>
                <p>Offer Details: {offer}</p>

                <Link to={ `/getUpdateOfferDetails/${accessToken}/${uuid}`}>
                    Edit Offer
                </Link>
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
              Please login to STAMP On the Homepage to view offers in Frontier
            </div>
          );
      }
    }
}

export { GetOfferDetails };