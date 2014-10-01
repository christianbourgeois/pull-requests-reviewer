;(function() {
    console.log('CONTENT SCRIPT WORKS!');

    var $ = require('./libs/jquery-2.1.1.min');
    console.log('jQuery version:', $().jquery);

    $(document).ready(function() {
        injectSidebar();
    });

    function injectSidebar() {
        $("body").append("<div id='pr_sidebar'></div>");
        var sidebarHtml = $("#pr_sidebar").load(chrome.extension.getURL('html/sidebar.html'));
    };
})();
