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
            return request(token, url).then(function(response) {
                if (response.links.next) {
                    return request(token, response.links.next).then(function(r) {
                        return $.merge(response.data, r.data);
                    });
                }
                return response.data;
            });
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
                var links = parseLinkHeader(jqXHR.getResponseHeader('Link'));
                console.log("Response Header - %o", links);
                deferred.resolve({
                    links: links,
                    data: data
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("%s - %s", textStatus, errorThrown);
                deferred.reject();
            }
        };
        $.ajax(url, settings);
        return deferred.promise();
    }

    function parseLinkHeader(header) {
        if (header.length == 0) {
            throw new Error("input must not be of zero length");
        }
        // Split parts by comma
        var parts = header.split(',');
        var links = {};
        // Parse each part into a named link
        $.each(parts, function(index, p) {
            var section = p.split(';');
            if (section.length != 2) {
                throw new Error("section could not be split on ';'");
            }
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        });
        return links;
    }


})(module);