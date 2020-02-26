'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var START_EFFECT_LEVEL = 20;
  var uploadImageContainer = document.querySelector('.img-upload__preview');
  var uploadImage = uploadImageContainer.querySelector('img');
  var uploadChangeImageContainer = document.querySelector('.img-upload__overlay');
  var uploadFileInput = document.querySelector('#upload-file');
  var effectLevel = document.querySelector('.effect-level__value');
  var pinEffectLine = document.querySelector('.effect-level__line');
  var pinLevel = document.querySelector('.effect-level__pin');
  var deptLevel = document.querySelector('.effect-level__depth');

  function onShowUploadImageContainer() {
    window.utils.getUpload(uploadFileInput, uploadImage, FILE_TYPES);
    window.utils.showElement(uploadChangeImageContainer);
    uploadChangeImageContainer.focus();
  }

  function onCloseUploadImageContainer() {
    uploadChangeImageContainer.classList.add('hidden');
    uploadFileInput.value = null;
    uploadImage.className = ' ';
  }

  uploadFileInput.addEventListener('change', onShowUploadImageContainer);

  document.addEventListener('keydown', function (evt) {
    if (evt.target.className !== 'text__description' && evt.target.className !== 'text__hashtags' && evt.keyCode === window.utils.KEY_CODE.ESC) {
      onCloseUploadImageContainer();
    }
  });

  var uploadImageEfectContainer = document.querySelector('.img-upload__effects');

  uploadImageEfectContainer.addEventListener('click', function (evt) {
    var target = evt.target;
    var imgClass = null;
    if (target.tagName === 'SPAN') {
      target.cheked = true;
      uploadImage.className = target.className;
      uploadImage.classList.remove('effects__preview');
      imgClass = uploadImage.className;
      effectLevel.value = START_EFFECT_LEVEL;
      pinLevel.style.left = getPercentLevel(START_EFFECT_LEVEL) + 'px';
      getDeptLevel(getPercentLevel(START_EFFECT_LEVEL));
      pinLevel.addEventListener('mousedown', changePin);
      var a = getEffectLevel(imgClass);
      uploadImage.style.filter = a;
    }
  });


  function getEffectLevel(imgClass) {
    var filter = null;
    switch (imgClass) {
      case 'effects__preview--chrome':
        filter = 'grayscale(' + 0.2 + ')';
        break;
      case 'effects__preview--sepia':
        filter = 'sepia(' + 2 + ')';
        break;
      case 'effects__preview--marvin':
        filter = 'invert(' + 100 + '%' + ')';
        break;
      case 'effects__preview--phobos':
        filter = 'blur(' + 3 + 'px' + ')';
        break;
      case '.effects__preview--heat':
        filter = 'brightness(' + 3 + ')';
        break;
      default:
        filter = null;
    }
    return filter;
  }

  function changePin(evt) {
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

      var pinEffectLineWidth = pinEffectLine.offsetWidth;
      var pinLeft = pinLevel.offsetLeft;
      var pinPositionX = pinLeft - shift.x;
      if (pinPositionX <= pinEffectLineWidth && pinPositionX >= 0) {
        pinLevel.style.left = pinPositionX + 'px';
        getDeptLevel(pinPositionX);
        var pinEffect = changePinEffect(pinPositionX, pinEffectLineWidth);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }


  var closeButton = document.querySelector('.img-upload__cancel');
  closeButton.addEventListener('click', onCloseUploadImageContainer);


  function getDeptLevel(value) {
    deptLevel.style.width = value + 'px';
  }

  function changePinEffect(pinPosition, effectWidth) {
    var valueEffect = Math.round(pinPosition / effectWidth * 100);
    effectLevel.value = valueEffect;
    return valueEffect;
  }

  function getPercentLevel(precent) {
    var value = pinEffectLine.offsetWidth * precent / 100;
    return value;
  }
})();
