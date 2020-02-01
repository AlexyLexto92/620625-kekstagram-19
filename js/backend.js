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
  /*
  document.addEventListener('click', function () {
    load(function (data) {
      console.log(data);
    });
  });
*/
  window.backend = {
    load: load,
    upload: upload
  };
})();
