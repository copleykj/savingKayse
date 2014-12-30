Meteor.methods({
    chargeDonor: function(token, formData){      
        try{
            Stripe.charges.create({
                amount: parseInt(formData.donationAmount) * 100,
                receipt_email: formData.emailAddress,
                currency: "usd",
                card: token
            });

        }catch(e){
            throw new Meteor.Error("501", e.message);
        }

        Donators.insert({name:formData.nameOnCard, email:formData.emailAddress, amount:formData.donationAmount});
    }
});
