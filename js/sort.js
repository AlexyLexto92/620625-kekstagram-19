'use strict';
(function () {
  function get(data) {
    var sortItem = document.querySelector('.img-filters');
    sortItem.addEventListener('click', function (evt) {
      var target = evt.target.id;
      switch (target) {
        case 'filter-default':
          getDefaultImages(data);
          break;
        case 'filter-random':
          getRandomImages(data);
          break;
        case 'filter-discussed':
          getDiscussedImages(data);
          break;
      }
    });
  }
  function getDefaultImages(data) {
    var images = document.querySelectorAll('.picture');
    images.forEach(function (it) {
      window.utils.removeElement(it);
    });
    window.utils.getPictures(data);
  }
  function getRandomImages(data) {
    var images = document.querySelectorAll('.picture');
    images.forEach(function (it) {
      window.utils.removeElement(it);
    });
    var randomImages = window.utils.shuffleArray(data.slice()).slice(0, 10);
    window.utils.getPictures(randomImages);
  }
  function getDiscussedImages(data) {
    var images = document.querySelectorAll('.picture');
    images.forEach(function (it) {
      window.utils.removeElement(it);
    });
    var discussedImages = data.slice();
    var sortedDiscussedImages = discussedImages.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.utils.getPictures(sortedDiscussedImages);
  }
  window.sort = {
    get: get,
  };
})();
