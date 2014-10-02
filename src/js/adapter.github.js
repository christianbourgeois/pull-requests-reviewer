var Github = require('./github');
var github = Github('username', 'password');
var repository = github.repository('AppDirect', 'AppDirect');
repository.pullRequests().then(function(prs) {
    console.log("Pull Request - %o", prs);
});

module.exports = {
  findPullRequests: function() {
    return [
      { title: "Import UIF in orange theme", id: 6081, labels: ["Frontend", "Need UI Review", "Ready To Merge"], author: "rgiard", nbNotifications: 10, url: "https://github.com/AppDirect/AppDirect/pull/6081" },
      { title: "[RtM] TPMEU-1129, ZD-8460 Translate Bundles and remove swedish", id: 6079, labels: [], author: "yluron", nbNotifications: 1, url: "https://github.com/AppDirect/AppDirect/pull/6079" }
    ];
  },

  openPullRequest: function(url) {
    window.location = url;
  }
};
