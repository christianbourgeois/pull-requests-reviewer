;(function() {
  var $ = require('./libs/jquery-2.1.1.min');
  var github = require('./adapter.github');

  $(document).ready(function() {
    compileTemplates().then(function() {
      injectSidebar();
      refreshSidebar();
    });
  });

  var sidebarTemplate = null;

  function compileTemplates() {
    return injectTemplate("sidebar", "html/sidebar.html").then(function(template) {
      sidebarTemplate = template;
    });
  }

  function injectTemplate(id, filename) {
    id += "-template";
    $("body").append('<script id="' + id + '" type="text/x-handlebars-template"></script>');

    var defer = $.Deferred();
    $("#" + id).load(chrome.extension.getURL(filename), function() {
      var html = $("#" + id).html();
      var Handlebars = require('./libs/handlebars-v2.0.0');
      defer.resolve(Handlebars.compile(html));
    });

    return defer;
  }

  function injectSidebar() {
    $("body").append("<div id='pr-extension'></div>");
    $("#pr-extension").html(sidebarTemplate({}));
  }

  function refreshSidebar() {
    var data = { pullRequests: github.findPullRequests() };
    $("#pr-extension").html(sidebarTemplate(data));
    bindEvents();
  }


  function bindToggleHandler() {
    $("#pr-extension .pr-toggle").off('click');
    $("#pr-extension .pr-toggle").on('click', function() {
      $('#pr-extension').toggleClass('pr-ext-toggle');
    });
  }

  function bindEvents() {
    $("#pr_sidebar #pull_requests li").click(function() {
      var id = $(this).attr("data-pr-id");
      github.openPullRequest(id);
    }).hover(function() {
      $(this).addClass();
    });

    bindToggleHandler();
  }
})();