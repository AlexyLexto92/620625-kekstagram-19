'use strict';
(function () {
  var HASHTAG_LENGHT = {
    MIN: 1,
    MAX: 20
  };
  var COMMENT_LENGHT = {
    MAX: 140
  };
  var form = document.querySelector('.img-upload__form');
  var hashtagField = document.querySelector('.text__hashtags');
  var sendButton = document.querySelector('.img-upload__submit');
  var commentsField = document.querySelector('.text__description');

  hashtagField.required = false;

  hashtagField.addEventListener('input', function (evt) {
    var hashtagText = evt.target.value;
    if (hashtagText.length > 0) {
      var re = /(?=#)/g;
      var hashtags = hashtagText.split(re);
      if (hashtags.length - 1 > 5) {
        hashtagField.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      }
      sendButton.disabled = true;
      if (checkHashtag(hashtags)) {
        sendButton.disabled = false;
      }
    }
  });
  commentsField.maxLength = COMMENT_LENGHT.MAX;
  commentsField.required = true;

  function checkHashtag(tagsArray) {
    var result = true;
    tagsArray.forEach(function (elem, index, array) {
      var elemArray = elem.split('');
      if (elemArray.length - 1 < HASHTAG_LENGHT.MIN) {
        hashtagField.setCustomValidity('Каждый Хештег должен состоять минимум из 2-х символов');
      } else if (elemArray.length > HASHTAG_LENGHT.MAX) {
        hashtagField.setCustomValidity('Каждый Хештег не может быть 20 символов');
      } else if (elemArray[0] !== '#') {
        hashtagField.setCustomValidity('Хештег должен начинаться с символа "#"');
      } else if (index !== array.length - 1 && elemArray[elemArray.length - 1] !== ' ') {
        hashtagField.setCustomValidity('Хештги должны разделяться пробелами');
      } else {
        hashtagField.setCustomValidity('');
      }
      if (elemArray.length <= HASHTAG_LENGHT.MAX && elemArray.length > HASHTAG_LENGHT.MIN && elemArray[0] === '#') {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      window.utils.getStatusScreen('success');
      var success = document.querySelector('.success');
      var successButton = success.querySelector('.success__button');
      document.addEventListener('click', function () {
        window.utils.removeElement(success);
      })
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.KEY_CODE.ESC) {
          window.utils.removeElement(success);
        }
      })
      successButton.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.KEY_CODE.ENTER) {
          window.utils.removeElement(success);
        }
      })
    }, function () {
      window.utils.getStatusScreen('error');
      var error = document.querySelector('.error');
      var errorButton = error.querySelector('.error__button');
      document.addEventListener('click', function () {
        window.utils.removeElement(error);
      })
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.KEY_CODE.ESC) {
          window.utils.removeElement(error);
        }
      })
      errorButton.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.utils.KEY_CODE.ENTER) {
          window.utils.removeElement(error);
        }
      });
    });
    window.preview.onCloseUploadImageContainer();
    evt.preventDefault();
  });
})();
