const key = require('../config/keys');
const stripe = require('stripe')(key.striptSecretKey);
const requireLogin = require('../middelwares/requireLogin');
module.exports = app => {
    // we put requireLogin as 2nd parameter to check whether user is log-in or not
    app.post('/api/stripe', requireLogin, async (req, res) => {
               
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "$5 for 5 credits"
            });
        
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};