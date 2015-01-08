'use strict';

angular.module('niaApp')
  .controller('QuoteCtrl', function ($scope) {

  var quoteList = ["Let it Go - Frozen", "Frankly, my dear, I don't give a damn - Gone With The Wind", "Here's looking at you, kid. - Casablanca", "E.T. phone home. - ET", "Bond. James Bond. - Dr. No", "Show me the money! - Jerry Maguire", "You're tearing me apart, Lisa. - The Room", "I did not hit her, it's not true! It's bullshit! I did not hit her! - The Room", "Thank you, honey, this is a beautiful party! You invited all my friends. Good thinking! - The Room", "You think about everything, ha ha ha. - The Room", "You think about everything, ha ha ha. - Field of Dreams", "Mama always said life was like a box of chocolates. - Forrest Gump", "There's no crying in baseball! - A League of Their Own"];


  function getInt(min, max) {
      return Math.floor(Math.random() * (max-min)) + min;
    };

  var randomNum = getInt(0, quoteList.length);
  var randomQuote = quoteList[randomNum];

  $scope.quotes = randomQuote;

  });


