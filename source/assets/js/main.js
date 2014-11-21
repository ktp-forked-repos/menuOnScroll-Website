jQuery(document).ready(function($) {
  var HeaderOnScroll = function() {
    this.container;
    this.menus = new Array();
    this.containerSections = new Array();

    this.setContainer = function(container) { this.container = container; }
    this.getContainer = function() { return this.container; }

  }
  
  HeaderOnScroll.prototype = {
    init: function() {
      this.getDocumentHeight();
      this.setMenuItems($(".menu-item"));
      this.setContainerSections();
    },

    getDocumentHeight: function() {
      return $( document ).height();
    },

    getContainerHeight: function(container) {
      console.log (container.height());
      return $(container).outerHeight();
    },

    getSectionId: function(menu) {
      return $(menu).find("a").attr("href");
    },

    setMenuItems: function($menus) {
      for (var i = 0; i < $menus.length; i++ ) {
        this.menus[i] = $menus[i]; 
      }
    },

    setContainerSections: function() {
      for (var i = 0; i < this.menus.length; i++) {
        this.containerSections[i] =  this.getSectionId(this.menus[i]);
      }
      console.log(this.containerSections);
    }
  }

  var headerOnScroll = new HeaderOnScroll();
  headerOnScroll.init();
});
