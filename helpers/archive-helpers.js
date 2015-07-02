var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(error, data){
    if (error) {
      return console.log(error);
    }
    var urlList = data.toString().split('\n');
    callback(urlList);
  });

};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urlList){
    callback(urlList.indexOf(url) > -1);
  });
};

exports.addUrlToList = function(url, callback){
  exports.isUrlInList(url, function(inList){
    if(!inList){
      fs.appendFile(exports.paths.list,'\n' + url);
    }
  })
  callback();
};

exports.isUrlArchived = function(url, callback){
  var found = true;
  fs.open(exports.paths.archivedSites+ '/' + url, 'r', function(err, fd){
    if (err) {
      found = false;
    }
  });
  callback(found);
};

exports.downloadUrls = function(pendingArray){
  for (var i = 1; i < pendingArray.length; i++){
    var uri = 'http://'+ pendingArray[i];
    request(uri).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + pendingArray[i]));
    exports.addUrlToList(pendingArray[i],function(){});
  }
};

