Meteor.publish("donators", function(){
    return Donators.find({}, {fields:{name:true, amount:true}});
});
