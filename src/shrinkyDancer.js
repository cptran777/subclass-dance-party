var ShrinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.apply(this, arguments);
  this.$node = $('<img class="dancer Ryu" src="src/img/ryu-throw.gif" alt="ZangiefDancer">');
  this.danceStance = 'src/img/ryu-throw.gif';
  this.idleStance = 'src/img/Ryu-ts-stance.gif';
  this.battleStance = 'src/img/RyuHadouken.gif';
  this.setPosition(top, left);
  window.shrinkyDancers.push(this);
};

ShrinkyDancer.prototype = Object.create(Dancer.prototype);
ShrinkyDancer.prototype.constructor = ShrinkyDancer;

ShrinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  // this.$node.animate({'height': ((Math.floor(Math.random() * 250) + 50 + 'px'))}, 'slow');
  var topPos = this.$node.css('top').split('');
  var leftPos = this.$node.css('left').split('');
  for (var x = 0; x < 2; x++) {
    topPos.pop();
    leftPos.pop();
  }
  topPos = Number(topPos.join('')) + (Math.random() * 100) - 50;
  leftPos = Number(leftPos.join('')) + (Math.random() * 100) - 50;
  this.$node.animate({
    top: topPos > -50 ? topPos + 'px' : -50 + 'px',
    left: leftPos > -50 ? leftPos + 'px' : -50 + 'px'
  });
};