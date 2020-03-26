'use strict';
(function () {
  var METHOD = {
    POST: 'POST',
    GET: 'GET'
  };

  var URL = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };

  var STATUS = {
    GOOD: 200
  };
  var TIMEOUT = 5000;

  window.sendRequest = function (onSuccess, createEror) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS.GOOD) {
        onSuccess(xhr.response);
      } else {
        createEror('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      createEror('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      createEror('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var load = function (onSuccess, createEror) {
    var xhr = window.sendRequest(onSuccess, createEror);
    xhr.open(METHOD.GET, URL.LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, createEror) {
    var xhr = window.sendRequest(onSuccess, createEror);
    xhr.open(METHOD.POST, URL.UPLOAD);
    xhr.send(data);
  };

  var createEror = function (message) {
    window.utils.getStatusScreen('error');
    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');
    var errorTitle = error.querySelector('.error__title');
    errorTitle.textContent = message;
    errorButton.textContent = 'Try again';

    function onClickEnterErrorButton(evt) {
      if (evt.keyCode === window.utils.KEY_CODE.ENTER) {
        window.utils.removeElement(error);
        window.gallery.showApp();
      }
      errorButton.removeEventListener('keydown', onClickEnterErrorButton);
    }

    function onClickErrorButton() {
      window.utils.removeElement(error);
      window.gallery.showApp();
      errorButton.removeEventListener('click', onClickEnterErrorButton);
    }

    document.addEventListener('click', function () {
      window.utils.removeElement(error);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEY_CODE.ESC) {
        window.utils.removeElement(error);
      }
    });
    errorButton.addEventListener('keydown', onClickEnterErrorButton);
    errorButton.addEventListener('click', onClickErrorButton);
  };
  window.backend = {
    load: load,
    upload: upload,
    createEror: createEror
  };
})();
