var Resume = function () {

  var jsonFile = 'resume.json';
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

var Video = function () {

  var jsonFile = 'video.json';
  var videos = [];

  var header = '<div class="row">'
    + '<div class="offset1">'
    + '<iframe width="420" height="315"';
  var footer = 'frameborder="0" allowfullscreen>'
    + '</iframe>';

  $.getJSON(jsonFile, function (data) {
    $.each(data.video, function (i, video) {
      var content = [];
      content.push(header);
      content.push('src="' + video.link + '"');
      content.push(footer);
      content.push('<dl>');
      content.push('<dt>' + video.title + '</dt>');
      $.each(video.festival, function (j, festival) {
        var date = '<span class="date">(' + festival.date + ')</span>';
        content.push('<dd>' + festival.name + ' ' + date + '</dd>');
        $.each(festival.awards, function (k, award) {
          content.push('<dd class="award">' + award + '</dd>');
        });
      });
      content.push('</dl></div></div>');
      videos.push(content);
    });

    $.each(videos, function (i, content) {
      var html = content.join('');
      $(html).appendTo('#Video');
    });
  });

}();
