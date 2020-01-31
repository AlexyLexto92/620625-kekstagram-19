'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureContainer = document.querySelector('.pictures');

var KEY_CODE = {
  ESC: 27,
  ENTER: 13,
};

var LIKES = {
  MIN: 15,
  MAX: 200,
};

var photoQuantity = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIBTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var NAMES = [
  'John',
  'Mike',
  'Nike',
  'Alis'
];

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElement(arr) {
  var randomindex = Math.floor(Math.random() * arr.length);
  return arr[randomindex];
}

function getPhotos(quantity) {
  photos = [];
  for (var i = 0; i < quantity; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(LIKES.MIN, LIKES.MAX),
      comments: getRandomElement(COMMENTS),
      description: getRandomElement(DESCRIBTIONS),
      name: getRandomElement(NAMES),
    };
  }
  return photos;
}
var photos = getPhotos(photoQuantity);

function getPicture(photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  return pictureElement;
}

function getPictures(image) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= image.length - 1; i++) {
    fragment.appendChild(getPicture(image[i]));
  }
  pictureContainer.appendChild(fragment);
  return pictureContainer;
}
getPictures(photos);

// Events

var uploadImageContainer = document.querySelector('.img-upload__preview');
var uploadImage = uploadImageContainer.querySelector('img');
var uploadChangeImageContainer = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');

function onShowUploadImageContainer() {
  uploadChangeImageContainer.classList.remove('hidden');
}

function onCloseUploadImageContainer() {
  uploadChangeImageContainer.classList.add('hidden');
  uploadFileInput.value = null;
  uploadImage.className = ' ';
}

uploadFileInput.addEventListener('change', onShowUploadImageContainer);

var onEscCloseUploadImageContainer = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    onCloseUploadImageContainer();
  }
};

document.addEventListener('keydown', onEscCloseUploadImageContainer);

document.addEventListener('click', function (evt) {

  if (evt.target.tagName === 'TEXTAREA' || evt.target.tagName === 'INPUT') {
    document.removeEventListener('keydown', onEscCloseUploadImageContainer);
  } else {
    document.addEventListener('keydown', onEscCloseUploadImageContainer);
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
