var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);

  if(req.method === 'GET'){
    //check req.url is / then serve up our index.html
    //else if req.url is /sites/* then check to see if the * is in our list of sites that have bee archived and serve it up if it is
    if(req.url === '/'){
      var asset = archive.paths.siteAssets + '/index.html'
      httpHelper.serveAssets(res, asset, function(){});
      response.writeHead(201, httpHelper.headers);
    }else{
      archive.isUrlInList(req.url.slice(1), function(isInList){
        if(isInList){
          //is in list
          archive.isUrlArchived(req.url.slice(1), function(isArchived){
            if(isArchived){
              //serve it up
            } else {
              //serve up robots are working
            }
          });
        } else {
          //not in list
          //serve up 404
        }
      });
    }

    response.writeHead(statusCode, httpHelper.headers);
    response.end();
  }
};
        var asset = archive.paths.archivedSites + req.url;
        httpHelper.serveAssets(res, asset, function(){});
