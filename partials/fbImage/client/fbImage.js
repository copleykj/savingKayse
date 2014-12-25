Template.fbImage.helpers({
    style: function() {  
        return {style:"float:left; width:"+this.width+"px; height:"+this.height+"px; background-size:cover; background-image:url("+this.url+");"};
    }
});