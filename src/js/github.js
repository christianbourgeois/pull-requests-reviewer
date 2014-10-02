(function(module) {
    var $ = require('./libs/jquery-2.1.1.min');

    var API_URL = 'https://api.github.com';

    module.exports = function(token) {
        return new GitHub(token);
    };

    function GitHub(token) {
        this.repository = function(username, repository) {
            return new Repository(token, username, repository);
        }
    }

    function Repository(token, username, repository) {
        this.pullRequests = function() {
            var url = API_URL + '/repos/' + username + '/' + repository + '/pulls?per_page=100';
            return request(token, url);
        }
    }

    function request(token, url) {
        var deferred = $.Deferred();
        var settings = {
            headers: {
                'Accept': 'application/vnd.github.raw+json',
                'Authorization': 'token ' + token,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            success: function(data, textStatus, jqXHR) {
                console.log("Response Header - %o", jqXHR.getResponseHeader('Link'));
                deferred.resolve(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("%s - %s", textStatus, errorThrown);
                deferred.reject();
            }
        };
        $.ajax(url, settings);
        return deferred.promise();
    }


})(module);