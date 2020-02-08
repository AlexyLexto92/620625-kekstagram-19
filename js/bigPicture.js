'use strict';
(function () {
  var countComents = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img')
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureLikeCount = bigPicture.querySelector('.likes-count');
  var bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureAllCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialCooments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCooment = bigPictureSocialCooments.querySelector('.social__comment');
  var bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');

  function showBigPicture(data, showElement) {
    bigPicture.classList.remove('hidden');
    console.log(data);
    var element = data[showElement]
    bigPictureImg.src = element.url;
    bigPictureImg.alt = element.description;

    bigPictureSocialCaption.textContent = element.description;
    bigPictureLikeCount.textContent = element.likes;

    showComments(element, countComents);
    getComments(element.comments, countComents);
  }
  function showComments(element, countOfComments) {
    bigPictureSocialCommentCount.textContent = element.comments.length >= countOfComments ? countOfComments + ' ' + 'из' + ' ' + element.comments.length + ' ' + 'комментариев' : element.comments.length + ' ' + 'комментариев';
    bigPictureAllCommentsCount.textContent = element.comments.length;
  }

  function getComment(coment) {
    var comment = bigPictureSocialCooment.cloneNode(true);
    bigPictureSocialCooments.textContent = '';
    comment.querySelector('.social__picture').src = coment.avatar;
    comment.querySelector('.social__text').textContent = coment.message;
    return comment;
  }

  function getComments(comments, count) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= count - 1; i++) {
      fragment.appendChild(getComment(comments[i]));
    }
    if (count >= comments.length) {
      bigPictureCommentsLoader.classList.add('visually-hidden');
    }
    bigPictureSocialCooments.appendChild(fragment);
    return bigPictureSocialCooments;
  }

  function onCloseBigPicture() {
    bigPicture.classList.add('hidden');
  }
  bigPictureCloseButton.addEventListener('click', onCloseBigPicture);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ESC) {
      onCloseBigPicture();
    }
  });
  window.bigPicture = {
    showBigPicture: showBigPicture
  }

})();