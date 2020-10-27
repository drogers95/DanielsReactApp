import React from 'react';


class GetUpdateOfferDetails extends React.Component {

    constructor (props) {
        super(props);

        let url = new URL(window.location.href).toString();
        let res = url.split("/");
        let pos = res.indexOf('getUpdateOfferDetails');
        let token = res[pos + 1];
        let uuid = res[pos + 2];

        this.state = {
            "accessToken": token,
            "uuid": uuid,
            "offer": null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();

        this.setState(prevState => ({
            offer: {
                ...prevState.offer,
                [event.target.name]: event.target.value
            }
        }));
    }

    handleSubmit(event) {
        let offerfields = this.state.offer;

        const requestOptions = {
            method: 'PATCH',
            withCredentials: true,
            headers: new Headers({
                'Authorization': 'Bearer ' + this.state.accessToken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(
                offerfields
            )
        };

        fetch('http://dev.api.frontier.com/offer/' + this.state.uuid, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ offer: data.offer }))
        .catch(error => this.setState({
            isLoading: false,
            message: 'Something bad happened: ' + error
        }));

        event.preventDefault();
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
          .then(data => this.setState({ offer: data.offer }))
          .catch(error => this.setState({
            isLoading: false,
            message: 'Something bad happened: ' + error
        }));
    }

    render () {
      const { offer, accessToken, message } = this.state;
      const offerFields = this.state.offer;

      let test = JSON.stringify(offerFields);

      console.log('Test: ' + test);

      if (offer) {

          const offerDetailsObj = Object.entries(offer).map(key => {
              const formName = key[0];
              const formNameVal = key[1];

              // TODO: Convert Object/Array into a , separated string
              if (typeof formNameVal != "string") {

                  if (typeof formNameVal == Array) {

                  }

                  if (typeof formNameVal == Object) {

                  }
              }

              return (
                  <input type="text" key={key}
                         name={formName}
                         value={ ((this.state.offer[formName] != formNameVal) ? this.state.offer[formName] : (formNameVal ?? '')) }
                         onChange={this.handleChange}
                  />
              );

          });

          return (
            <div className="card text-center m-3">
                {/*<p>Access Token: {accessToken}</p>
                <p>Offer UUID: {uuid}</p>
                <p>Offer Details: {offerDetailsObj}</p>*/}

                <form onSubmit={this.handleSubmit}>
                    {offerDetailsObj}

                   {/* <input type="text" placeholder="Name" name="name" value={ ((this.state.name != null) ? this.state.name : (key[1] ?? '')) }
                           onChange={this.handleChange} />
                    <input type="text" placeholder="Meta Title" name="meta_title"  />
                    <input type="text" placeholder="Meta Description" name="meta_description"  />
                    <input type="text" placeholder="Keyword, Another Keyword" name="keywords" />
                    <input type="text" placeholder="offer-url" name="url_slug"  />
                    <input type="text" placeholder="link_out" name="link_out"  />
                    <input type="text" placeholder="Admin Image" name="admin_image"  />
                    <input type="text" placeholder="payout" name="payout"  />
                    <input type="text" placeholder="payout_currency" name="payout_currency"  />
                    <input type="text" placeholder="payout_days" name="payout_days"  />
                    <input type="text" placeholder="percent_payout" name="percent_payout"  />
                    <input type="text" placeholder="Payout Type i.e. fixed" name="payout_type"  />*/}

                    {/* TODO: Implement date picker like in Modulus admin for offer start/end times */}

                    {/*<input type="text" placeholder="start" name="start"  />
                    <input type="text" placeholder="expire" name="expire"  />
                    <input type="text" placeholder="commission" name="commission"  />
                    <input type="text" placeholder="GBP" name="commission_currency"  />
                    <input type="text" placeholder="percent_payout" name="percent_payout"  />
                    <select name="publish_status">
                        <option value="published">Published</option>
                        <option value="un-published">Un Published</option>
                    </select>*/}

                    {/* TODO: Implement ability to add additional data. fields to the form */}
                    {/*<input type="text" placeholder="terms" name="data.terms"  />
                    <input type="text" placeholder="description" name="data.description"  />

                    <input type="text" placeholder="user_agent_restrictions" name="user_agent_restrictions"  />
                    <input type="text" placeholder="categories_data" name="categories_data"  />
                    <input type="text" placeholder="Date Modified" name="modified"  />*/}

                    {/* TODO: Get the submit button to trigger the above useForm() */}
                    <input type="submit" />
                </form>
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

export { GetUpdateOfferDetails };