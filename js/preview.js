'use strict';
(function () {

  var uploadImageContainer = document.querySelector('.img-upload__preview');
  var uploadImage = uploadImageContainer.querySelector('img');
  var uploadChangeImageContainer = document.querySelector('.img-upload__overlay');
  var uploadFileInput = document.querySelector('#upload-file');

  function onShowUploadImageContainer() {
    window.utils.showElement(uploadChangeImageContainer);
    uploadChangeImageContainer.focus();
  }

  function onCloseUploadImageContainer() {
    uploadChangeImageContainer.classList.add('hidden');
    uploadFileInput.value = null;
    uploadImage.className = ' ';
  }

  uploadFileInput.addEventListener('change', onShowUploadImageContainer);

  var onEscCloseUploadImageContainer = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ESC) {
      onCloseUploadImageContainer();
      document.removeEventListener('keydown', onEscCloseUploadImageContainer);
    }
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.target.className === 'text__description' || evt.target.className === 'text__hashtags') {
      document.removeEventListener('keydown', onEscCloseUploadImageContainer);
    } else {
      onCloseUploadImageContainer();
    }
  });

  var uploadImageEfectContainer = document.querySelector('.img-upload__effects');
  uploadImageEfectContainer.addEventListener('click', function (evt) {

    var target = evt.target;
    if (target.tagName === 'SPAN') {
      target.cheked = true;
      uploadImage.className = target.className;
      uploadImage.classList.remove('effects__preview');
    }
  });

  var closeButton = document.querySelector('.img-upload__cancel');
  closeButton.addEventListener('click', onCloseUploadImageContainer);
  var pinLevel = document.querySelector('.effect-level__pin');
  var deptLevel = document.querySelector('.effect-level__depth');
  function getDeptLevel(value) {
    deptLevel.style.width = value + 'px';
  }
  pinLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinEffectLine = document.querySelector('.effect-level__line');
      var pinEffectLineWidth = pinEffectLine.offsetWidth;
      var pinLeft = pinLevel.offsetLeft;
      var pinPositionX = pinLeft - shift.x;
      if (pinPositionX <= pinEffectLineWidth && pinPositionX >= 0) {
        pinLevel.style.left = pinPositionX + 'px';
        getDeptLevel(pinPositionX);

      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
