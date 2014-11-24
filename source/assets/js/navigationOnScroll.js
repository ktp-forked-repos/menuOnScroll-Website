( function($) {
  $.navOnScroll = function(nav, options) {
    var plugin = this,
        $nav = $(nav),
        navItems,
        navItemsLength,
        isTouch = 'ontouchstart' in window,
        activeNavIndex = 0,
        containerScrollTop = new Array(),
        containerHeights = new Array(),
        winHeight,
        docHeight,
        resizeTimeout,

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
      $(window).on("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimout = setTimeout(plugin.run(), 300);
      });
    };

    plugin.run= function() {
      plugin.setDimension();
      plugin.setNavItems();
      plugin.setContainerScrollTop();
      plugin.updateNavOnScroll(0); // This make sure that the first nav will be set onload.
      plugin.windowOnScroll();
    };

    // ===================================================
    // Plugin Actions
    // ===================================================

    plugin.windowOnScroll = function() {
      (isTouch === true) ? plugin.touchScroll() : plugin.mouseScroll();
    };

    plugin.touchScroll = function() {
      $(window).on("touchmove", function() {
        var scrollTop = $(this).scrollTop();
        plugin.updateNavOnScroll(scrollTop);
      });
    };

    plugin.mouseScroll = function() {
      $(window).on("scroll", function() {
        var scrollTop = $(this).scrollTop();
        plugin.updateNavOnScroll(scrollTop);
      });
    };

    plugin.updateNavOnScroll = function(scrollTop) {
      plugin.setActiveNavIndex(scrollTop);
      $nav.find("."+settings.navActiveClass).removeClass(settings.navActiveClass);
      $(navItems[activeNavIndex]).addClass(settings.navActiveClass);
    };

    // ===================================================
    // Plugin Utility Setters/Getters
    // ===================================================

    plugin.setNavItems = function() {
      navItems = $(settings.navSelector);
      navItemsLength = navItems.length;
    };

    plugin.setDimension = function() {
      winHeight = $(window).height();
      docHeight = $(document).height();
    };

    plugin.setContainerScrollTop = function() {
      for (var i = 0; i < navItemsLength; i++) {
        var sectionId = $(navItems[i]).find("a").attr("href");
        containerHeights[i] = $(sectionId).outerHeight();
        containerScrollTop[i] = (i === 0) ? 0 : containerHeights[i-1] + containerScrollTop[i-1];
      }
    };

    plugin.setActiveNavIndex = function(scrollTop) {
      for (var i = 0; i < navItemsLength; i++) {
        if ( scrollTop + winHeight > docHeight - settings.footerOffset ) {
          activeNavIndex = navItemsLength - 1;
          break;
        }
        else if (scrollTop >= containerScrollTop[i] && scrollTop < containerScrollTop[i+1]) {
          activeNavIndex = i;
          break;
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
