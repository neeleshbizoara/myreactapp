import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions'

class StripeBiller extends Component {
    render() {
        return (
            <StripeCheckout
            name="Emaily"
            description="$5 for email credits"
            amount={500}
            token={token => this.props.handelToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="btn">
                Add credits
            </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(StripeBiller);
