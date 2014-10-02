(function(module) {
    console.log('GITHUB SCRIPT LOADED!');

    var $ = require('./libs/jquery-2.1.1.min');

    module.exports = function(username, password) {
        return new GitHub();
    }

    function GitHub() {
        this.repository = function(username, repository) {
            return new Repository();
        }
    }

    var values = [
        { title: "Import UIF in orange theme", id: 6081, labels: ["Frontend", "Need UI Review", "Ready To Merge"], author: "rgiard", nbNotifications: 10, url: "https://github.com/AppDirect/AppDirect/pull/6081" },
        { title: "[RtM] TPMEU-1129, ZD-8460 Translate Bundles and remove swedish", id: 6079, labels: [], author: "yluron", nbNotifications: 1, url: "https://github.com/AppDirect/AppDirect/pull/6079" }
    ];

    function Repository() {
        this.pullRequests = function() {
            var deferred = $.Deferred();
            deferred.resolve(values);
            return deferred.promise();
        }
    }


})(module);