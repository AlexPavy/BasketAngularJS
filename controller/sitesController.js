/*var url = require('url');
var M = require('../model/Sites');
var Site = M.db.model('Site', M.SiteSchema);
var Visit = M.db.model('Visit', M.VisitSchema);
var BNode = M.db.model('Node', M.NodeSchema);
var BookmarksRoot = M.db.model('BookmarksRoot', M.BookmarksRootSchema);*/

var addVisit = function(input) {
  var allData = url.parse(input.url, true, true);
  Site.findOne({url: allData.host}, function(err, site) {
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
        url: input.url,
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
    url: allData.host,
    desc: 'Site desc',
    imgPath: '',
    title: 'Site Title',
    visits: [],
    lastVisitDate: curDate,
  };
  
  var visitObj = {
    url: input.url,
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

/**
 * Populate a node with database data of foreign keys
 */
var populate = function(bnode) {
  for(var i in bnode.nodes){
    bnode.nodes[i].populate('nodes');
    var nodes = bnode.nodes[i].nodes;
      for(var j in nodes) {
        populate(nodes[j]);
      }
  }
}

/**
 * Hand made singleton for all bookmarks
 */
var getBookmarks = function(){
  BookmarksRoot.findOne()
  .populate('nodes')
  .exec(function (err, bmksRoot){
    if (err) { console.log(err); }
    // Singleton hand-made
    var bookmarks;
    if(bmksRoot){
      bookmarks = populate(bmksRoot);
    } else {
      bookmarks = new BookmarksRoot({nodes: []});
      bookmarks.save(function(err, doc) {
        if (err) { return console.error(err); }
      });
    }
    return bookmarks;
  });
}

exports.getBookmarks = getBookmarks;
exports.addVisit = addVisit;