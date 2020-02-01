'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureContainer = document.querySelector('.pictures');

  function getPicture(photo) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    return pictureElement;
  }

  function getPictures(images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= images.length - 1; i++) {
      fragment.appendChild(getPicture(images[i]));
    }
    pictureContainer.appendChild(fragment);
    return pictureContainer;
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.load(function (data) {
      getPictures(data);
    });
  });
})();
