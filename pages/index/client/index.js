Template.index.rendered = function() {
    $('body').scrollspy({ target: '#main-nav', offset: 300 });
    
    $('#main-nav').affix({
        offset: {
            top: function () {
                var el = $('#highlight');
                return (this.top = el.position().top+el.outerHeight(true));
            }
        }
    });
};