$(document).ready(function() {
  injectSidebar();
});

function injectSidebar() {
  $("body").append("<div id='pr_sidebar'></div>");
  var sidebarHtml = $("#pr_sidebar").load(chrome.extension.getURL('html/sidebar.html'));
}
