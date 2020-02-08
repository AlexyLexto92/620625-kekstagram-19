'use strict';
(function () {
  var KEY_CODE = {
    ESC: 27,
    ENTER: 13,
  };

  function debounce(time, cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, time);
    };
  }

  function removeElement(element) {
    element.remove(element);
  }

  function getRandomNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function showElement(element) {
    element.classList.remove('hidden');
  }

  function getRandomElement(arr) {
    var randomindex = Math.floor(Math.random() * arr.length);
    return arr[randomindex];
  }

  function getPicture(photo) {
    var pictureElement = window.gallery.pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    return pictureElement;
  }

  function getPictures(images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= images.length - 1; i++) {
      fragment.appendChild(getPicture(images[i]));
    }
    window.gallery.pictureContainer.appendChild(fragment);
    return window.gallery.pictureContainer;
  }

  function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
      var b = Math.floor(Math.random() * (c + 1));
      var a = d[c];
      d[c] = d[b];
      d[b] = a;
    }
    return d;
  }
  window.utils = {
    removeElement: removeElement,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    KEY_CODE: KEY_CODE,
    showElement: showElement,
    getPicture: getPicture,
    getPictures: getPictures,
    shuffleArray: shuffleArray,
    debounce: debounce,
  };
})();
