if(Meteor.settings && Meteor.settings.Stripe){
    Stripe = StripeSync(Meteor.settings.Stripe.secretKey);
}else{
    throw new Error("You need to provide a secret key through Meteor.settings.Stripe.secretKey");
}