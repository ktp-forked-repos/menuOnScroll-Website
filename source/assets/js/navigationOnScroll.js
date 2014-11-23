( function($) {
  $.navOnScroll = function(nav, options) {
    var plugin = this,
        $nav = $(nav),
        $navItems,
        navItemsLength,
        isTouch = 'ontouchstart' in window,
        activeNavIndex = 0,
        containerScrollTop = new Array(),
        containerHeights = new Array(),
        winHeight,
        docHeight,

        defaults = {
          navActiveClass: "active",
          navSelector: ".menu-item",
          footerOffset: 100
        },

        settings;

    plugin.init = function() {
      plugin.settings = settings = $.extend({}, defaults, options);
      plugin.run();
      plugin.onResizeDone();
    };

    plugin.onResizeDone = function() {

    };

    plugin.run= function() {
      plugin.setDimension();
      plugin.setNavItems();

    };

    plugin.setNavItems = function() {
      $navItems = $(settings.navSelector);
      navItemsLength = $navItems.length;
    };

    plugin.setDimension = function() {
      windowHeight = $(window).height();
      docHeight = $(document).height();
      console.log(windowHeight);
    };

    plugin.setContainerScrollTop = function() {
      for (var i = 0; i < navItemsLength; i++) {
        var sectionId = $navItems[i].find("a").attr("href");
        containerHeights[i] = $(sectionId).outerHeight();
        plugin.setContainerScrollTop(i);
      }
    };

    plugin.setContainerScrollTopOffset = function(index) {
      containerScrollTop[index] = (index === 0) ? 0 : containerScrollTop[index - 1] + containerHeights[index];
    };

    plugin.setActiveNavIndex = function(scrollTop) {
      for (var i = 0; i < navItemsLength; i++) {
        if ( scrollTop + winHeight > docHeight - settings.footerOffset ) {
          activeNavIndex = navItemsLength - 1;
          break;
        }
        else if (scrollTop >= containerScrollTop[i] && scrollTop < containerScrollTop[i+1]) {
          activeNavIndex = i;
        }
        else {
          activeNavIndex = navItemsLength - 1;
        }
      }
    };
  };

  $.fn.navOnScroll = function(options) {
    return this.each(function() {
      var $this = $(this);
      plugin = new $.navOnScroll(this, options);
      plugin.init();
    });
  };
 
})(jQuery);
