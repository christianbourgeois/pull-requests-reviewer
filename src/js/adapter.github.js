var Github = require('./github');
var github = Github('95a7d5120cbc9438cdb1eaa4e539a469f419af4b');
var repository = github.repository('AppDirect', 'AppDirect');
//repository.pullRequests().then(function(prs) {
//    console.log("Pull Request Raw - %o", prs);
//    var result = prs.map(function(pr) {
//        return {
//            id: pr.number,
//            title: pr.title,
//            url: pr.html_url,
//            author: pr.user.login
//        }
//    });
//    console.log("Pull Request - %o", result);
//});

module.exports = {
  findPullRequests: function() {
      console.log("Repository - %o", repository);
      return repository.pullRequests().then(function(prs) {
          console.log("Pull Request Raw - %o", prs);
          var result = prs.map(function(pr) {
              return {
                  id: pr.number,
                  title: pr.title,
                  url: pr.html_url,
                  author: pr.user.login
              }
          });
          console.log("Pull Request Transformed - %o", result);
          return result;
      });
  },

  openPullRequest: function(url) {
    window.location = url;
  }
};
