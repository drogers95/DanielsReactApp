import React from 'react';
import { Link } from "react-router-dom";

class GetOffers extends React.Component {
    constructor (props) {
        super(props);

        let url = new URL(window.location.href).toString();
        let res = url.split("/");
        let pos = res.indexOf('offers');
        let result = res[pos + 1];

        this.state = {
          offers: null,
          accessToken: result
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

        fetch('http://dev.api.frontier.com/offers', requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ offers: data.offers.results }))
          .catch(error => this.setState({
            isLoading: false,
            message: 'Something bad happened: ' + error
        }));
    }

    render () {
      const { offers, accessToken, message } = this.state;

      if (offers) {

          const offersArr = offers.map((offer) =>
              <li key={offer.uuid}>
                  {/*<p>Offer UUID: {JSON.stringify(offer.uuid)}</p>*/}
                  <Link to={ `/getOfferDetails/${accessToken}/${offer.uuid}`}>
                      {JSON.stringify(offer.name)}
                  </Link>
              </li>
          );

          return (
              <div className="card text-center m-3">
                  <p>Access Token: {accessToken}</p>
                  <p>Offers: {offersArr}</p>
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

export { GetOffers };