var SpinnyDancer = function(top, left, timeBetweenSteps) {
  Dancer.apply(this, arguments);
  this.facing = 'down';
};

SpinnyDancer.prototype = Object.create(Dancer.prototype);
SpinnyDancer.prototype.constructor = SpinnyDancer;

SpinnyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.

  if (this.facing === 'down') {
    this.$node.css({'-webkit-transition': '0.5s', 
      '-webkit-transform': 'rotateY(360deg)'});
    this.facing = 'up';
  } else if (this.facing === 'up') {
    this.$node.css({'-webkit-transition': '0.5s', 
      '-webkit-transform': 'rotateY(0deg)'});
    this.facing = 'down';  
  }

};