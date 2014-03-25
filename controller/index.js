var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://192.168.12.10:7474');
var SC = require('./sitesController.js');

//AJAX calls
exports.addVisit = function(req, res) {

  var cypher = ["CREATE (s:Site {url: \"lola\"})",
              "RETURN s"].join('\n');

  console.log("ADDING VISIT");
  db.query(cypher, {}, function(err, result) {
    if (err) console.log(err);
    console.log(result);
    return res.json(result);
  });
};

var sendAllData = function(req, res) {
  var cypher = "MATCH (s) "
           + "RETURN s;";

  db.query(cypher, {}, function(err, result) {
    if (err) console.log("GOODE", err);
    return res.json(result);
  });

//Populate with visits
};

exports.sendAllData = sendAllData;

exports.removeSite = function(req, res) {
  Site.find({_id: req.params.site_id})
  .exec(function (err, site){
    if (err) { return res.send(err); }
    for(var i in site.visits){
      Visit.remove({
          _id : site.visits[i],
        }, function(err, todo) {
    		if (err)
    		  return res.send(err);
    		}
    	);
    }
  });
  Site.remove({
			_id : req.params.site_id
		}, function(err, todo) {
			if (err)
				return res.send(err);
		});
		
	sendVisits(req, res);
};

/* Bookmarks ******************************************/

exports.updateNode = function(req, res) {
  
}

exports.sendBookmarks = function(req, res) {
  var bookmarks = SC.getBookmarks();
  res.json(bookmarks);
};

exports.index = function(req, res){
  res.sendfile('./client/index.html');
};