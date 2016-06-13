var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this);
  this.step();
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  var self = this;
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(self);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  self.$node.toggle();
};