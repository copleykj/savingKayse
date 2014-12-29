Router._scrollToHash = function (hashValue) {
    try {
        $.scrollTo(hashValue, 500);
    } catch (e) {
        // in case the hashValue is bogus just bail out
    }
};

Router.route("/", {
    name:"index",
    template: "index"
});