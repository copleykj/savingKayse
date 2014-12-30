var affixNav = function affixNav() {
    var mainNav = $('#main-nav');
    mainNav.affix({
        offset: {
            top: function () {
                var el;
                if(parseInt(mainNav.css("margin-top"), 10) !== 0){
                    el = $('#highlight');
                    return (this.top = el.position().top+el.outerHeight(true));
                }else{
                    return (this.top = 0);
                }
            }
        }
    });
};

Meteor.subscribe("donators");

Template.index.rendered = function() {
    $('body').scrollspy({ target: '#main-nav', offset: 180 });
    
    affixNav();
    
    $('#ccnum').payment('formatCardNumber');
    $("#cvcnum").payment('restrictNumeric');
    $('#donationAmount').payment('restrictNumeric');
    
    if(window.location.hash){
        $.scrollTo(window.location.hash, 0);
    }
};

Template.index.helpers({
    donated: function(){
        return ReactiveStore.get("donated");
    },
    donators: function() {
        var donators = Donators.find();
        if(donators.count() > 0){
            return donators;
        }
    },
    totalDonations: function() {
        var total = 0;
        Donators.find().forEach(function(donation){
            total += parseInt(donation.amount);
        });
        return total;
    }
});

Template.index.events({
   "submit form": function(e, t){
       e.preventDefault();
       t.$("button[type=submit]").attr("disabled", "disabled");
   } 
});

Mesosphere({
    name:"donationForm",
    method: function(rawFormData){
        Mesosphere.donationForm.validate(rawFormData);
    },
    onSuccess:function(formData, form){
        var input = form.find('button[type=submit]');
        
        input.text("Processing..");

        Stripe.card.createToken(form, function(status, response){
            var error = response.error;
            var token = response.id;

            if(!error){
                delete formData.ccnum;
                delete formData.cvcnum;
                
                Meteor.call('chargeDonor', token, formData, function(error){
                    if(error){
                        Mesosphere.Utils.failureCallback({payment:{message:error.reason}}, $(form));
                    }else{
                        Mesosphere.Utils.successCallback(formData, $(form));
                        ReactiveStore.set("donated", true);
                    }
                    input.text("Donate").attr('disabled', null);
                });
            }else{
                Mesosphere.Utils.failureCallback({payment:{message:error.message}}, $(form));
                input.text("Donate").attr('disabled', null);
            }
        });
    },
    onFailure: function(erroredFields, form){
        var input = form.find('button[type=submit]');
        
        Meteor.setTimeout(function(){
            input.text("Donate").attr("disabled", null);
        }, 0);
        
        Mesosphere.Utils.failureCallback(erroredFields, form);
    },
    fields:{
        emailAddress: {
            required: true,
            format: "email",
            message: "Invaild Email",
            requiredMessage: "Email Required"
        },
        nameOnCard:{
            required:true,
            requiredMessage:"Cardholder Name Required",
            format: /[A-Z ]/i
        },
        donationAmount:{
            required:true,
            format: "integer",
            requiredMessage: "Amount Required"
        },
        ccnum:{
            required:true,
            format:"creditcard",
            message:"Invalid Card Number",
            requiredMessage:"Credit Card Required"
        },
        cvcnum:{
            required:true,
            requiredMessage:"CVC Required",
            format:/[0-9]{3,4}/,
            message:"3-4 digit #",
        },
        expmonth:{
            required:true,
            requiredMessage:"Exp Month Required",
            format:"integer",
            rules:{
                exactLength:2
            }
        },
        expyear:{
            required:true,
            requiredMessage:"Exp Year Required",
            format:"integer",
            rules:{
                exactLength:4
            }
        }
    }
});
