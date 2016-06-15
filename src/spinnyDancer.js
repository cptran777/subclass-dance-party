var SpinnyDancer = function(top, left, timeBetweenSteps) {
  Dancer.apply(this, arguments);
  this.danceStance = 'src/img/zangief-spin.gif';
  this.idleStance = 'src/img/Sf-zangief.gif';
  this.battleStance = '';
  this.$node = $('<img class="dancer Zangief" src="src/img/zangief-spin.gif" alt="ZangiefDancer">');
  this.setPosition(top, left);
  window.spinnyDancers.push(this);
};

SpinnyDancer.prototype = Object.create(Dancer.prototype);
SpinnyDancer.prototype.constructor = SpinnyDancer;

SpinnyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  var topPos = this.$node.css('top').split('');
  var leftPos = this.$node.css('left').split('');
  for (var x = 0; x < 2; x++) {
    topPos.pop();
    leftPos.pop();
  }
  topPos = Number(topPos.join('')) + (Math.random() * 50) - 25;
  leftPos = Number(leftPos.join('')) + (Math.random() * 50) - 25;
  this.$node.animate({
    top: topPos > -50 ? topPos + 'px' : -50 + 'px',
    left: leftPos > -50 ? leftPos + 'px' : -50 + 'px'
  });

};