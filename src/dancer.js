// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<img class="dancer">');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.stepTracker;
  window.dancers.push(this);
  this.dancing = true;
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
};

Dancer.prototype.step = function() {
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
  this.stepTracker = setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function(top, left) {
  // animate dancers to position via top and left
  clearTimeout(this.stepTracker);
  this.$node.animate({
    top: top,
    left: left
  });
};

Dancer.prototype.collision = function(side) {
  if (side === 'left') {
    this.$node.animate({left: $('body').width() / 2 - 275,
      top: $('body').height() * 2 / 3});
  } else if (side === 'right') {
    this.$node.animate({left: $('body').width() / 2 + 50,
      top: $('body').height() * 2 / 3});
  }

  //this.step();

};

Dancer.prototype.fight = function(enemyFighter) {
  var $dancerHealthBarBG = $('<div class="redhealthbar">.</div>');
  var $enemyHealthBarBG = $('<div class="redhealthbar">.</div>');
  var $dancerHealthBar = $('<div class="greenhealthbar">.</div>');
  var $enemyHealthBar = $('<div class="greenhealthbar">.</div>');
  $('body').append($dancerHealthBarBG);
  $('body').append($dancerHealthBar);
  console.log(this.$node.position());
  $dancerHealthBar.css({top: this.$node.position().top - 50,
    left: this.$node.position().left + 50
  });
  $('body').append($enemyHealthBarBG);
  $('body').append($enemyHealthBar);
  $enemyHealthBar.css({top: enemyFighter.$node.position().top - 50,
    left: enemyFighter.$node.position().left + 50
  });
  setTimeout(function () {
    $dancerHealthBar.animate({width: $dancerHealthBar.width() - 50});
  }, 1000);
  setTimeout(function () {
    enemyFighter.$node.css({
      '-webkit-transition': '3s',
      '-webkit-transform': 'rotateZ(720deg)'
    });
    enemyFighter.$node.animate({top: -400});
  }, 3500);
};


