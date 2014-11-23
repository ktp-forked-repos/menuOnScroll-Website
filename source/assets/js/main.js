jQuery(document).ready(function($) {
  var HeaderOnScroll = function(selector, options) {
    this.$selector = $(selector);
    this.containerOffsets = new Array();
    this.containerSectionHeights = new Array();
    this.isTouch = 'ontouchstart' in window;
    this.windowHeight;
    this.documentHeight;
  }
  
  HeaderOnScroll.prototype = {
    init: function() {
      this.menus = $(".menus");
      this.menuItems = this.menus.children();
      this.menuItemsLength = this.menuItems.length;
      this.currentIndex = 0;
      this.footerOffset = 100; // This makes sure the index will update when the pagescroll nears to bottom.
      this.runApp();
      this.onResizeDone();
    },

    onResizeDone: function() {
      var that = this;
      $(window).on("resize", function() {
        setTimeout(function() { 
          that.runApp();
        }, 300);
      });
    },

    runApp: function() {
      this.setWindowDocumentHeights();
      this.setContainerSections();
      this.setContainerOffsets();
      this.updateHeaderOnScroll();
      this.windowOnScroll();
    },

    getContainerHeight: function(container) {
      return $(container).outerHeight();
    },

    getSectionId: function(menu) {
      return $(menu).find("a").attr("href");
    },

    setWindowDocumentHeights: function() {
      this.windowHeight = $(window).height();
      this.documentHeight = $(document).height();
    },

    setContainerSections: function() {
      for (var i = 0; i < this.menuItemsLength; i++) {
        var sectionId = this.getSectionId(this.menuItems[i]);
        this.containerSectionHeights[i] = this.getContainerHeight(sectionId);
        this.setContainerOffsets(i);
      }
    },

    setContainerOffsets: function(index) {
      this.containerOffsets[index] = (index === 0) ? 0 : this.containerOffsets[index - 1] + this.containerSectionHeights[index]
    },

    setScrollIndex: function(scrollTop) {
      for ( var i = 0; i < this.menuItemsLength - 1; i++ ) {
        if ( scrollTop + this.windowHeight > this.documentHeight  - this.footerOffset ) {
          this.currentIndex = this.menuItemsLength - 1;
          break;
        }
        if ( scrollTop >= this.containerOffsets[i] && scrollTop < this.containerOffsets[i+1] ) {
          this.currentIndex = i;
          break;
        }
        else {
          this.currentIndex = this.menuItemsLength - 1;
        }
      }
    },

    windowOnScroll: function() {
      (this.isTouch === true) ? this.touchScroll() : this.mouseScroll();
    },

    mouseScroll: function() {
      var that = this;
      $(window).on("scroll", function(event) {
        var scrollTop = $(window).scrollTop();
        that.setScrollIndex(scrollTop);
        that.updateHeaderOnScroll();
      });
    },

    touchScroll: function() {
      var that = this;
      $(window).on({
        "touchmove": function(event) {
          var scrollTop = $(this).scrollTop();
          that.setScrollIndex(scrollTop);
          that.updateHeaderOnScroll();
        }
      });
    },

    updateHeaderOnScroll: function() {
      this.menus.find(".active").removeClass("active");
      $(this.menuItems.get(this.currentIndex)).addClass("active"); 
    }
  }

  var headerOnScroll = new HeaderOnScroll();
  headerOnScroll.init();
  $(".menus").navOnScroll();
});
