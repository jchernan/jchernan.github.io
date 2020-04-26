$(function () {

  function datedDescription(description, date, content) {
    content.push('<dd class="d-flex flex-wrap align-items-center">');
    content.push('<div>' + description + '</div>');
    content.push('<div class="small text-muted font-italic ml-3">(');
    content.push(date);
    content.push(')</div>');
    content.push('</dd>');
  }

  /*
   * Read and load resume content
   */
  var resume = {};

  $.getJSON('data/resume.json', function (data) {
    $.each(data.resume, function (key, val) {
      if (!resume.hasOwnProperty(val.category)) {
        resume[val.category] = [];
      }
      var content = resume[val.category];
      var title = val.title;
      if (val.institute.group) {
        title = title + ', ' + val.institute.group;
      }
      var institute = '<a class="text-reset text-decoration-none" href="'
        + val.institute.link + '">'
        + val.institute.name + '</a>';
      content.push('<dt>' + title + '</dt>');
      datedDescription(institute, val.dates, content);
    });
    $.each(resume, function (category, content) {
      $('#' + category).append('<dl>' + content.join('') + '</dl>');
    });
  });


  /*
   * Read and load video content
   */
  var iframeStart = '<div class="embed-responsive embed-responsive-16by9">'
    + '<iframe allowfullscreen class="embed-responsive-item" ';
  var iframeEnd = '></iframe></div>';

  $.getJSON('data/video.json', function (data) {
    $.each(data.video, function (i, video) {
      var content = [];
      content.push(iframeStart);
      content.push('src="' + video.link + '"');
      content.push(iframeEnd);
      content.push('<dl class="py-3">');
      content.push('<dt>' + video.title + '</dt>');
      $.each(video.festival, function (j, festival) {
        datedDescription(festival.name, festival.date, content);
        content.push('<ul class="font-italic">');
        $.each(festival.awards, function (k, award) {
          content.push('<li>' + award + '</li>');
        });
        content.push('</ul>');
      });
      content.push('</dl>');
      $('.video-content').append(content.join(''));
    });
  });

  /*
   * Load programmer's log content
   */
  $('.log-content').load('log.html')

});
