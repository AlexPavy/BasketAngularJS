
// Get Poll schema and model
var M = require('../model/Sites.js');
var Site = M.db.model('Site', M.SiteSchema);
var SC = require('./sitesController.js');

var sendVisits = function(req, res) {
  Site.find()
  .populate('visits')
  .exec(function (err, sites){
    if (err) { return res.send(err); }
    // console.log("sending sites");
    // console.log(sites);
    res.json(sites);
  });
};

//AJAX calls
exports.addVisit = function(req, res) {
  SC.addVisit(req.body);
  sendVisits(req, res);
};

exports.sendVisits = sendVisits;

exports.removeSite = function(req, res) {
  SC.deleteSite(req, res);
  sendVisits(req, res);
};

exports.index = function(req, res){
  res.sendfile('./client/index.html');
};