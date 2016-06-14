var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.apply(this, arguments);
  this.$node = $('<img class="dancer Ryu" src="src/img/Ken-ts-stance.gif" alt="ZangiefDancer">');
  this.setPosition(top,left);
  window.blinkyDancers.push(this);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  //this.$node.toggle();

};