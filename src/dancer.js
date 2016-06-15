// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<img class="dancer">');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.stepTracker;
  window.dancers.push(this);
  this.facing = 'right';
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
  console.log("dancer collision called");
  if (side === 'left') {
    this.$node.animate({left: $('body').width() / 2 - 275,
      top: $('body').height() * 2 / 3});
    this.facing = 'right';
    this.$node.css({
      '-webkit-transform': '',
      'filter': '',
      '-ms-filter': ''
    });
  } else if (side === 'right') {
    this.$node.animate({left: $('body').width() / 2 + 50,
      top: $('body').height() * 2 / 3});
    this.facing = 'left';
    this.$node.css({
      '-webkit-transform': 'scaleX(-1)',
      'filter': 'FlipH',
      '-ms-filter': 'FlipH'
    });
  }

  //this.step();

};

Dancer.prototype.fight = function(enemyFighter) {
  var $dancerHealthBarBG = $('<div class="redhealthbar">.</div>');
  var $enemyHealthBarBG = $('<div class="redhealthbar">.</div>');
  var $dancerHealthBar = $('<div class="greenhealthbar">.</div>');
  var $enemyHealthBar = $('<div class="greenhealthbar">.</div>');
  var self = this;
  this.$node.attr('src', this.idleStance);
  enemyFighter.$node.attr('src', enemyFighter.idleStance);
  $('body').append($dancerHealthBarBG);
  $('body').append($dancerHealthBar);
  $dancerHealthBar.css({top: this.$node.position().top - 50,
    left: this.$node.position().left + 50
  });
  $dancerHealthBarBG.css({top: this.$node.position().top - 50,
    left: this.$node.position().left + 50
  });
  $('body').append($enemyHealthBarBG);
  $('body').append($enemyHealthBar);
  $enemyHealthBar.css({top: enemyFighter.$node.position().top - 50,
    left: enemyFighter.$node.position().left + 50
  });
  $enemyHealthBarBG.css({top: enemyFighter.$node.position().top - 50,
    left: enemyFighter.$node.position().left + 50
  });
  setTimeout(function () {
    $dancerHealthBar.animate({width: $dancerHealthBar.width() - 50});
    self.$node.attr('src', self.battleStance);
    enemyFighter.$node.attr('src', enemyFighter.battleStance);
  }, 1000);
  setTimeout(function () {
    $enemyHealthBar.animate({width: $dancerHealthBar.width() - 100});
  }, 1400);
  setTimeout(function () {
    $dancerHealthBar.animate({width: $dancerHealthBar.width() - 90});
  }, 1800);
  setTimeout(function () {
    $enemyHealthBar.animate({width: $dancerHealthBar.width() - 100});
  }, 2200);
  setTimeout(function () {
    enemyFighter.$node.attr('src', enemyFighter.idleStance);
    enemyFighter.$node.css({
      '-webkit-transition': '',
      '-webkit-transform': '',
      '-filter': '',
      '-ms-filter': ''
    });
    if (enemyFighter.facing === 'right') {
      enemyFighter.$node.animate({
        left: -800,
        top: -200
      }, 'fast');
    } else if (enemyFighter.facing === 'left') {
      enemyFighter.$node.animate({
        left: $('body').width() + 800,
        top: -200
      }, 'fast');
    }
    enemyFighter.$node.css({
      '-webkit-transition': '1s',
      '-webkit-transform': 'rotateZ(720deg)'
    });
  }, 2350);
  setTimeout(function () {
    $dancerHealthBar.remove();
    $enemyHealthBar.remove();
    $dancerHealthBarBG.remove();
    $enemyHealthBarBG.remove();
    enemyFighter.$node.remove();
    self.$node.attr('src', self.danceStance);
    self.step();
    // if (self.facing === 'left') {
    //   self.$node.css({
    //     '-webkit-transition': '0s',
    //     '-webkit-transform': 'rotateY(0deg)'
    //   });
    //   self.facing = 'right';
    // }
  }, 4500);
};


