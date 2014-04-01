var url = require('url');
var M = require('../model/Sites');
var Site = M.db.model('Site', M.SiteSchema);
var Visit = M.db.model('Visit', M.VisitSchema);

var addVisit = function(input) {
  var allData = url.parse(input.url, true, true);
  Site.findOne({host: allData.host}, function(err, site) {
    if (err) return console.error(err);
    if (site) {
      console.log("found corresponding site")
      console.log(site)
      addVisitToSite(site, allData, input);
    } else {
      addNewSite(allData, input);
    }
  });
}

var addVisitToSite = function(site, allData, input) {
  var curDate = new Date();
    // TOADD , query: allData.query
  Visit.findOne({path: allData.pathname}, function(err, visit) {
    if (err) return console.error(err);
    if (visit) {
      console.log("found corresponding visit")
      console.log(visit)
      visit.dates.push(curDate)
    } else {
      var visitObj = {
        path: allData.pathname,
        desc: input.desc,
        dates: [curDate],
        device: '',
        browser: '',
        imgPath: '',
        query: allData.query,
      };
      console.log("create new visit")
      visit = new Visit(visitObj);
    }
    
    site.lastVisitDate = curDate;
  
    console.log("visit")
    console.log(visit)
    site.visits.push(visit);
    visit.save(function(err, doc) {
      if (err) { return console.error(err); }
    });
    site.save(function(err, doc) {
      if (err) { return console.error(err); }
    });
    
  });
}

var addNewSite = function(allData, input) {
  var curDate = new Date();
  
  var siteObj = {
    host: allData.host,
    desc: 'Site desc',
    imgPath: '',
    title: 'Site Title',
    visits: [],
    lastVisitDate: curDate,
  };
  
  var visitObj = {
    path: allData.pathname,
    desc: input.desc,
    dates: [curDate],
    device: '',
    browser: '',
    imgPath: '',
    query: allData.query,
  };
  
  var visit = new Visit(visitObj);
  var site = new Site(siteObj);
  
  site.visits.push(visit);
  visit.save(function(err, doc) {
    if (err) { return console.error(err); }
  });
  site.save(function(err, doc) {
    if (err) { return console.error(err); }
  });
}

exports.deleteSite = function(req, res){
  console.log("req.params.site_id", req.params.site_id)
  Site.findById(req.params.site_id)
  .exec(function (err, site){
    console.log("site", site)
    var visits = site.visits;
    if (err) { return res.send(err); }
    for(var i in visits){
      console.log("visitId", visits[i])
      Visit.remove({
  			_id : visits[i]
  		}, function(err, todo) {
  			if (err)
  				return res.send(err);
  		});
    }
    Site.remove({
			_id : req.params.site_id
		}, function(err, todo) {
			if (err)
				return res.send(err);
		});
  });
}

exports.addVisit = addVisit;