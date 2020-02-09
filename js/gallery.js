'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 300;
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureContainer = document.querySelector('.pictures');
  var sortItem = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var filterContainer = document.querySelector('.img-filters');


  function changeSortName() {
    sortItem.classList.remove('img-filters--inactive');
    filterContainer.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        if (evt.target.classList.contains('img-filters__button--active')) {
          return;
        } else {
          filterButtons.forEach(function (it) {
            var nameClass = it.className = 'img-filters__button';
            return nameClass;
          });
          evt.target.classList.add('img-filters__button--active');
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.load(function (data) {

      data.forEach(function(it,index){
        it.id = index;
      });
      window.utils.getPictures(data);
      window.bigPicture.showBigPicture(data, 16);
      changeSortName();
      window.utils.debounce(DEBOUNCE_INTERVAL, window.sort.getSort(data));
    });
  });
  window.gallery = {
    pictureContainer: pictureContainer,
    pictureTemplate: pictureTemplate,
  };
})();
