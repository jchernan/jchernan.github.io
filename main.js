/*
* Alert if using old Internet Explorer version
*/
var alertIEVersion = function () {

  // using 'IE Conditional Comment' detection code described in
  // http://ajaxian.com/archives/attack-of-the-ie-conditional-comment

  var v = 3;
  var div = document.createElement('div');
  do {
    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
  } while (div.getElementsByTagName('i')[0])

  if (v > 4 && v < 10) {
    // alert if IE version is less than 10
    var alert = '<div class="alert">'
      + '<button type="button" class="close" data-dismiss="alert">'
      + '&times;</button>'
      + '<strong>Warning!</strong> You are using an old version of '
      + 'Internet Explorer. For a better browsing experience upgrade '
      + 'to Internet Explorer 10.'
      + '</div>';
    $(alert).prependTo('#content');
  }

}();

/*
* Read and load resume content
*/
var resume = function () {

  var jsonFile = 'data/resume.json';
  var resume = {};

  $.getJSON(jsonFile, function (data) {
    $.each(data.resume, function (key, val) {
      if (!resume.hasOwnProperty(val.category)) {
        resume[val.category] = [];
      }
      var content = resume[val.category];
      var title = val.title;
      if (val.institute.group !== '') {
        title = title + ', ' + val.institute.group;
      }
      var date = '<span class="date">(' + val.dates + ')</span>';
      var institute = '<a href="' + val.institute.link + '">'
        + val.institute.name + '</a>';
      content.push('<dt>' + title + '</dt>');
      content.push('<dd>' + institute + ' ' + date + '</dd>');
    });
    $.each(resume, function (category, content) {
      var html = '<dl>' + content.join('') + '</dl>';
      $(html).appendTo('#' + category);
    });
  });

}();

/*
* Read and load video content
*/
var video = function () {

  var jsonFile = 'data/video.json';
  var videos = [];

  var rowStart = '<div class="row">'
    + '<div class="col-xs-12 col-sm-8 col-md-6 '
    + 'col-sm-offset-1 col-md-offset-1" '
    + 'style="padding-bottom:10px;">';
  var rowEnd = '</div></div>'

  var iframeStart = '<div class="embed-responsive embed-responsive-4by3">'
    + '<iframe allowfullscreen class="embed-responsive-item" ';
  var iframeEnd = '></iframe></div>';

  $.getJSON(jsonFile, function (data) {
    $.each(data.video, function (i, video) {
      var content = [];
      content.push(rowStart);
      content.push(iframeStart);
      content.push('src="' + video.link + '"');
      content.push(iframeEnd);
      content.push(rowEnd);
      content.push(rowStart);
      content.push('<dl>');
      content.push('<dt>' + video.title + '</dt>');
      $.each(video.festival, function (j, festival) {
        var date = '<span class="date">(' + festival.date + ')</span>';
        content.push('<dd>' + festival.name + ' ' + date + '</dd>');
        $.each(festival.awards, function (k, award) {
          content.push('<dd class="award">' + award + '</dd>');
        });
      });
      content.push('</dl>');
      content.push(rowEnd);
      videos.push(content);
    });

    $.each(videos, function (i, content) {
      var html = content.join('');
      $(html).appendTo('#Video');
    });
  });

}();

