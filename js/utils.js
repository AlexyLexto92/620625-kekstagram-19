'use strict';
(function () {
  var KEY_CODE = {
    ESC: 27,
    ENTER: 13,
  };

  function getRandomNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function getRandomElement(arr) {
    var randomindex = Math.floor(Math.random() * arr.length);
    return arr[randomindex];
  }
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    KEY_CODE: KEY_CODE
  };
})();
