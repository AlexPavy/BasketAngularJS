var displayNode = function(node) {
  var jQfolder = $("#bookmarks").find("#folder_"+ node._id);
  var files = node.files;
  for(var i in files) {
    jQfolder.append("<li class=\""+files[i].domClass+"\" id=\"file_"+files[i].content._id+"\">"+smallCard(files[i].content)+"</li>");
    if(files[i].domClass=="folder"){
      jQfolder.find("#file_"+ files[i]._id).append("<ul class=\""+files[i].domClass+"\" id=\"folder_"+files[i].content._id+"\"></ul>")
      displayNode(files[i]);
    }
  }
}