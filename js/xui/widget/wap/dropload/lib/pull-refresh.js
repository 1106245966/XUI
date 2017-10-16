(function ($) {
  var PTR = function(el, distance) {
    this.container = $(el);
    this.distance = distance || 50;
    this.attachEvents();
  };

  PTR.prototype.touchStart = function(e) {
    if(this.container.hasClass("xui-refreshing")) return;
    var p = $.getTouchPosition(e);
    this.start = p;
    this.diffX = this.diffY = 0;
  };

  PTR.prototype.touchMove= function(e) {
    if(this.container.hasClass("xui-refreshing")) return;
    if(!this.start) return false;
    if(this.container.scrollTop() > 0) return;
    var p = $.getTouchPosition(e);
    this.diffX = p.x - this.start.x;
    this.diffY = p.y - this.start.y;
    if(this.diffY < 0) return;
    this.container.addClass("xui-touching");
    e.preventDefault();
    e.stopPropagation();
    this.diffY = Math.pow(this.diffY, 0.8);
    this.container.css("transform", "translate3d(0, "+this.diffY+"px, 0)");

    if(this.diffY < this.distance) {
      this.container.removeClass("xui-pull-up").addClass("xui-pull-down");
    } else {
      this.container.removeClass("xui-pull-down").addClass("xui-pull-up");
    }
  };
  PTR.prototype.touchEnd = function() {
    this.start = false;
    if(this.diffY <= 0 || this.container.hasClass("xui-refreshing")) return;
    this.container.removeClass("xui-touching");
    this.container.removeClass("xui-pull-down xui-pull-up");
    this.container.css("transform", "");
    if(Math.abs(this.diffY) <= this.distance) {
    } else {
      this.container.addClass("xui-refreshing");
      this.container.trigger("xui.pull.refresh");
    }
  };

  PTR.prototype.attachEvents = function() {
    var el = this.container;
    el.addClass("xui-pull-refresh");
    el.on($.touchEvents.start, $.proxy(this.touchStart, this));
    el.on($.touchEvents.move, $.proxy(this.touchMove, this));
    el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
  };

  var pullToRefresh = function(el) {
    new PTR(el);
  };

  var pullToRefreshDone = function(el) {
    $(el).removeClass("xui-refreshing");
  };

  $.fn.pullRefresh = function(distance) {
    if(distance === 'done'){
        return this.each(function() {
            pullToRefreshDone(this);
        });
    }
    return this.each(function() {
      pullToRefresh(this, distance);
    });
  };

})(jQuery);
