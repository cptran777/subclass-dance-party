$(document).ready(function() {
  window.spinnyDancers = [];
  window.blinkyDancers = [];
  window.shrinkyDancer = [];
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
    for (var i = 0, pos = 50; i < window.spinnyDancers.length; i++, pos += 50) {
      // for each dancer, call line up to incrementing top and a set left
      window.spinnyDancers[i].lineUp(pos, ($('body').width() * 0.5) - 100);

    }
  });

  $('.fightOn').on('click', function(event) {
    for (var i = 0, pos = 50; i < window.spinnyDancers.length; i++, pos += 50) {
      // for each dancer, call line up to incrementing top and a set left
      window.spinnyDancers[i].step();

    }
  });

});

