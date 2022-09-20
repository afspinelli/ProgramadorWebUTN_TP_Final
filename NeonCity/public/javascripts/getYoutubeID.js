var playerElements = document.getElementsByClassName('youtube-player');
for (var n = 0; n < playerElements.length; n++) {

    var videoId = playerElements[n].dataset.id;

    var tutorialImg = document.getElementsByClassName('embed-youtube');

    var div = document.createElement('div');
    div.setAttribute('data-id', videoId);
    var thumbNode = document.createElement('img');
    thumbNode.src = '//i.ytimg.com/vi/ID/hqdefault.jpg'.replace('ID', videoId);
    div.appendChild(thumbNode);
    tutorialImg[n].appendChild(div);
}