var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var mime = require('mime');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {

  fs.readFile(asset, {encoding: 'utf8'}, function(err,data){
    if(err){
      res.writeHead(404, exports.headers);
      res.end();
    }
    //exports.headers['Content-Type'] = mime.lookup(asset);
    res.writeHead(200, exports.headers);
    res.end(data);
  });

};

exports.sendRedirect = function(res, loc, status){
  status = status || 302;
  res.writeHead(status, {Location: loc});
  res.end();
}

// As you progress, keep thinking about what helper functions you can put here!
