var db = require("seraph")("http://webbasketdb.sb01.stations.graphenedb.com:24789/db/data/");

var VisitSchema = new mongoose.Schema({
    url: String,
    path: String,
    desc: String,
    dates: [Date],
    device: String,
    browser: String,
    imgPath: String,
    query: String,
});

exports.SiteSchema = new mongoose.Schema({
    url: String,
    desc: String,
    imgPath: String,
    title: String,
    visits: [{type: mongoose.Schema.Types.ObjectId, ref: 'Visit'}],
    lastVisitDate: Date,
});

var NodeSchema = new mongoose.Schema({
    site: {type: mongoose.Schema.Types.ObjectId, ref: 'Site'},
    visit: {type: mongoose.Schema.Types.ObjectId, ref: 'Visit'},
    nodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Node'}],
});

var BookmarksRootSchema = new mongoose.Schema({
    nodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Node'}],
});

// var BookmarksSchema = new mongoose.Schema({
//     data: mongoose.Schema.Types.Mixed,
// });

exports.BookmarksRootSchema = BookmarksRootSchema;
exports.NodeSchema = NodeSchema;
exports.VisitSchema = VisitSchema;
exports.db = db;