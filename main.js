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
    $.each(resume, function (key, val) {
      var html = '<dl>' + val.join('') + '</dl>';
      $(html).appendTo('#' + key);
    });
  });

}();
