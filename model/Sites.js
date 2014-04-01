var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://AlexPavy:9Fkx4MHddzC6Hh@emma.mongohq.com:10092/WebBasketDB");

var VisitSchema = new mongoose.Schema({
  path: String,
  desc: String,
  dates: [Date],
  device: String,
  browser: String,
  imgPath: String,
  query: String,
});

exports.SiteSchema = new mongoose.Schema({
  host: String,
  desc: String,
  imgPath: String,
  title: String,
  visits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Visit'}],
  lastVisitDate: Date,
});

exports.BookmarkSchema = new mongoose.Schema({
  visits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Visit'}],
});

exports.VisitSchema = VisitSchema;
exports.db = db