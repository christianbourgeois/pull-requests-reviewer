(function(module) {
    console.log('GITHUB SCRIPT LOADED!');

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
//6093
    function Repository(token, username, repository) {
        this.pullRequests = function() {
            var url = API_URL + '/repos/' + username + '/' + repository + '/pulls';
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
            success: function(data) {
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