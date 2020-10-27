import React from "react";
import {
BrowserRouter as Router,
Switch,
Route,
Link,
useRouteMatch
} from "react-router-dom";
import { GetStampLoginUri } from "./AdminUsers/GetStampLoginUri";
import { GetOffers } from "./Offers/GetOffers";
import { GetOfferDetails } from "./Offers/GetOfferDetails";
import { GetUpdateOfferDetails } from "./Offers/GetUpdateOfferDetails";

export default function App() {
    return (
        <Router>
            <div>
                <MenuLink
                    activeOnlyWhenExact={true}
                    to="/"
                    label="Home"
                />
                {/*<MenuLink to="/offers" label="Offers" />*/}

                <hr />

                {/* Only need new Routes for new pages/urls */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path="/offers/:accessToken" component={GetOffers}>
                        <Offers />
                    </Route>

                    <Route path="/getOfferDetails/:accessToken/:uuid" component={GetOfferDetails}>
                        <OfferDetails />
                    </Route>

                    <Route path="/getUpdateOfferDetails/:accessToken/:uuid" component={GetUpdateOfferDetails}>
                        <UpdateOfferDetails />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function MenuLink({ label, to, activeOnlyWhenExact }) {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <div className={match ? "active" : ""}>
            {match && "> "}
            <Link to={to}>{label}</Link>
        </div>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <GetStampLoginUri />
        </div>
    );
}

function Offers() {
    return (
        <div>
            <GetOffers />
        </div>
    );
}

function OfferDetails() {
    return (
        <div>
            <GetOfferDetails />
        </div>
    );
}

function UpdateOfferDetails() {
    return (
        <div>
            <GetUpdateOfferDetails />
        </div>
    );
}