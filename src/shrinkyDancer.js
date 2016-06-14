var ShrinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.apply(this, arguments);
};

ShrinkyDancer.prototype = Object.create(Dancer.prototype);
ShrinkyDancer.prototype.constructor = ShrinkyDancer;

ShrinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.animate({'height': ((Math.floor(Math.random() * 250) + 50 + 'px'))}, 'slow');
};