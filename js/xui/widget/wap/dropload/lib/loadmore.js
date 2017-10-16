(function ($) {
  var Infinite = function(el, distance) {
    this.container = $(el);
    this.container.data("infinite", this);
    this.distance = distance || 50;
    this.attachEvents();
  };

  Infinite.prototype.scroll = function() {
    var container = this.container;
    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
    if(offset <= this.distance) {
      container.removeClass('xui-loadmore-done');
      container.trigger("xui.loadmore");
    }
  };

  Infinite.prototype.attachEvents = function(off) {
    var el = this.container;
    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
    scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
  };
  Infinite.prototype.detachEvents = function(off) {
    this.attachEvents(true);
  };

  var infinite = function(el) {
    attachEvents(el);
  };

  $.fn.loadmore = function(distance) {
    if(distance === 'uninstall'){
        return this.each(function() {
            var infinite = $(this).data("infinite");
            if(infinite && infinite.detachEvents) infinite.detachEvents();
        });
    }else if(distance === 'done'){
      this.addClass("xui-loadmore-done");
      this.loadmore('uninstall');
    }
    return this.each(function() {
      new Infinite(this, distance);
    });
  }

})(jQuery);
