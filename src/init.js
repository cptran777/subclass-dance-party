var calculateDistance = function (node1, node2) {
  var height = Math.abs(node1.position().top - node2.position().top);
  var width = Math.abs(node1.position().left - node2.position().left);
  return Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
};

$(document).ready(function() {

  var collisionTracker;
  var collision = function() {
    var sortedWindow = window.dancers.sort(function(a, b) {
      return a.$node.position().left - b.$node.position().left;
    });
    for (var i = 0; (i + 1) < window.dancers.length; i++) {
      // check positions between thisDancer and referenced Dancer
      var dist = calculateDistance(window.dancers[i].$node, window.dancers[i + 1].$node);
      // if diagonal is less than xpx
      if (dist <= 210) {
        // call global spreadOut to align all dancers on the side
        console.log("distance met");
        clearTimeout(collisionTracker);
        for (var x = 0; x < window.dancers.length; x++) {
          clearTimeout(window.dancers[x].stepTracker);
        }
        spreadOut();

        // run collision on thisDancer and referenced Dancer
        window.dancers[i].collision('left');
        window.dancers[i + 1].collision('right'); 
        window.dancers[i].$node.attr('src', window.dancers[i].idleStance);
        window.dancers[i + 1].$node.attr('src', window.dancers[i + 1].idleStance);

        setTimeout(function() {
          if (Math.floor(Math.random() * 2) === 0) {
            window.dancers[i].fight(window.dancers[i + 1]);
            if (window.dancers[i + 1].$node.hasClass('Ryu')) {
              for (var j = 0; j < window.shrinkyDancers.length; j++) {
                if (window.shrinkyDancers[j] === window.dancers[i + 1]) {
                  window.shrinkyDancers.splice(j, 1);
                  j = window.shrinkyDancers.length;
                }
              }
            } else if (window.dancers[i + 1].$node.hasClass('Ken')) {
              for (var j = 0; j < window.shrinkyDancers.length; j++) {
                if (window.blinkyDancers[j] === window.dancers[i + 1]) {
                  window.blinkyDancers.splice(j, 1);
                  j = window.blinkyDancers.length;
                }
              }
            } else if (window.dancers[i + 1].$node.hasClass('Zangief')) {
              for (var j = 0; j < window.spinnyDancers.length; j++) {
                if (window.spinnyDancers[j] === window.dancers[i + 1]) {
                  window.spinnyDancers.splice(j, 1);
                  j = window.spinnyDancers.length;
                }
              }
            }
            window.dancers.splice(i + 1, 1);
          } else {
            window.dancers[i + 1].fight(window.dancers[i]);
            if (window.dancers[i].$node.hasClass('Ryu')) {
              for (var j = 0; j < window.shrinkyDancers.length; j++) {
                if (window.shrinkyDancers[j] === window.dancers[i]) {
                  window.shrinkyDancers.splice(j, 1);
                  j = window.shrinkyDancers.length;
                }
              }
            } else if (window.dancers[i].$node.hasClass('Ken')) {
              for (var j = 0; j < window.shrinkyDancers.length; j++) {
                if (window.blinkyDancers[j] === window.dancers[i]) {
                  window.blinkyDancers.splice(j, 1);
                  j = window.blinkyDancers.length;
                }
              }
            } else if (window.dancers[i].$node.hasClass('Zangief')) {
              for (var j = 0; j < window.spinnyDancers.length; j++) {
                if (window.spinnyDancers[j] === window.dancers[i]) {
                  window.spinnyDancers.splice(j, 1);
                  j = window.spinnyDancers.length;
                }
              }
            }
            window.dancers.splice(i, 1);
          }
        }, 3500);
        return;
      }
    }
    collisionTracker = setTimeout(collision, 1000);
  };

  collisionTrakcer = setTimeout(collision, 1000);

  var spreadOut = function() {
    console.log("spread called");
    for (var x = 0; x < window.dancers.length; x++) {
      clearTimeout(window.dancers[x].stepTracker);
    }
    var leftSide = 50;
    var rightSide = $('body').width() - 350;
    for (var i = 0; i < window.dancers.length; i++) {
      if ((i % 2 === 0)) {
        window.dancers[i].$node.animate({
          left: leftSide
        });
        leftSide += 10;
        window.dancers[i].facing = 'right';
        window.dancers[i].$node.css({
          // '-webkit-transition': '0s',
          '-webkit-transform': 'scaleX(1)'
        });
      } else {
        window.dancers[i].$node.animate({
          left: rightSide
        });
        window.dancers[i].facing = 'left';
        window.dancers[i].$node.css({
          // '-webkit-transition': '0s',
          '-webkit-transform': 'scaleX(-1)',
          'filter': 'FlipH',
          '-ms-filter': 'FlipH'
        });
        rightSide -= 10;
      }
    }
  };


  window.spinnyDancers = [];
  window.blinkyDancers = [];
  window.shrinkyDancers = [];
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      ($("body").height() * 0.7 + ($("body").height() * .3 * Math.random()) - 200),
      ($("body").width() * Math.random()) - 100, 1000);
    $('body').append(dancer.$node);
  });

  $('.lineUpButton').on('click', function(event) {
    // iterate through dancers
    console.log("lineup registers");
    clearTimeout(collisionTracker);
    for (var i = 0, pos = 50; i < window.spinnyDancers.length; i++, pos += 50) {
      // for each dancer, call line up to incrementing top and a set left
      window.spinnyDancers[i].lineUp(pos, ($('body').width() * 0.5) - 100);
    }
    for (var i = 0, pos = 50; i < window.blinkyDancers.length; i++, pos += 50) {
      window.blinkyDancers[i].lineUp(pos, ($('body').width() * 0.8) - 100);
    }
    for (var i = 0, pos = 50; i < window.shrinkyDancers.length; i++, pos += 50) {
      window.shrinkyDancers[i].lineUp(pos, ($('body').width() * 0.2) - 100);
    }
  });

  $('.fightOn').on('click', function(event) {
    console.log("fighton called");
    for (var i = 0, pos = 50; i < window.dancers.length; i++, pos += 50) {
      // for each dancer, call line up to incrementing top and a set left
      window.dancers[i].step();
    }
    collisionTracker = setTimeout(collision, 1000);
  });

});

