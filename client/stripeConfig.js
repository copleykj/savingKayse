if(Meteor.settings && Meteor.settings.public.Stripe){
    Stripe.setPublishableKey(Meteor.settings.public.Stripe.publicKey);
}else{
    throw new Error("You need to provide a publishable key through Meteor.settings.public.Stripe.publicKey");
}