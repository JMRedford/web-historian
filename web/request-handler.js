var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('handling a request to url: '+req.url);
  //res.end(archive.paths.list);

  if(req.method === 'GET'){
    //check req.url is / then serve up our index.html
    //else if req.url is /sites/* then check to see if the * is in our list of sites that have bee archived and serve it up if it is
    if(req.url === '/'){
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/index.html');
    }else if(req.url === '/styles.css'){
      httpHelper.serveAssets(res, archive.paths.siteAssets + '/styles.css')
    }else{
      var url = req.url.slice(1);
      archive.isUrlInList(url, function(isInList){
        if(isInList){
          //is in list
          archive.isUrlArchived(url, function(isArchived){
            if(isArchived){
              //serve up the requested page with httpHelper.serveAssets(res, asset, callback)
              httpHelper.serveAssets(res, archive.paths.archivedSites + '/' + url);
            } else {
              //serve up 'robots are working' with httpHelper.serveAssets(res, asset, callback)
              httpHelper.serveAssets(res, archive.paths.siteAssets + '/loading.html');
            }
          });
        } else {
          //not in list
          //serve up 404
          res.writeHead(404);
          res.end();
        }
      });
    }
  }
  //handle a post
  else if(req.method === 'POST'){
    var requestBody = '';
    req.on('data', function(data){
      requestBody += data;
    })
    req.on('end', function(){
      var url = requestBody.slice(4);
      archive.isUrlInList(url, function(inList){
        if(inList){
          archive.isUrlArchived(url, function(inArchive){
            if(inArchive){
               //display page
               httpHelper.serveAssets(res, archive.paths.archivedSites + '/' + url);
            }else{
               //display loading
               httpHelper.sendRedirect(res, archive.paths.siteAssets + '/loading.html');
            }
          })
        }else{
           //append to list
           archive.addUrlToList(url, function(){
             httpHelper.sendRedirect(res, archive.paths.siteAssets + '/loading.html');
           });
           //display loading
        }
      });
    });
  }

};
