jQuery(document).ready(function($) {
  var HeaderOnScroll = function() {
    this.init();
  }
  
  HeaderOnScroll.prototype = {
    init: function() {
      this.getDocumentHeight();
    },

    getDocumentHeight: function() {
      return $( document ).height();
    }
  }

});
