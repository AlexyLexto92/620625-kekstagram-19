'use strict';
(function () {
  var HASHTAG_LENGHT = {
    MIN: 1,
    MAX: 20
  }
  var hashtagField = document.querySelector('.text__hashtags');

  hashtagField.required = true;
  hashtagField.addEventListener('input', function (evt) {
    var hashtagText = evt.target.value;
    if (hashtagText.length > 0) {
      var re = /(?=#)/g;
      var hashtags = hashtagText.split(re);
    if( checkHashtag(hashtags)){
      console.log('true');
    };

    }

  })

  function checkHashtag(tagsArray) {
    debugger
   return tagsArray.forEach(function (elem) {
      var elemArray = elem.split('');
      if (elemArray.length <= HASHTAG_LENGHT.MAX && elemArray.length > HASHTAG_LENGHT.MIN && elemArray[0] == '#') {
          return true;
      }
      else{
        return false;
      }
    })
  }
})();