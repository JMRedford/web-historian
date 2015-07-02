// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var cron = require('cron');
var helpers = require('../helpers/archive-helpers')

var CronJob = cron.CronJob;
new CronJob('00 * * * * *', function(){
    helpers.readListOfUrls(function(list){
      helpers.downloadUrls(list)
    });
    console.log("running cron");
  }, null, true);
