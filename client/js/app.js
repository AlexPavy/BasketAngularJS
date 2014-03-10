// $('#inURL').bind("enterKey", function (e) {
//   addVisit();
// });
// $('#inURL').keyup(function (e) {
//   if (e.keyCode == 13) {
//     $(this).trigger("enterKey");
//   }
// });
$("#clickme").click(function () {
  $("#book").slideUp("slow", function () {
    // Animation complete.
  });
});

$(function () {
  // $("#bookmarks").jstree({
  //   'core' : {
  //     'data' : [
  //       'Simple root node',
  //       {
  //         'text' : 'Root node 2',
  //         'state' : {
  //           'opened' : true,
  //           'selected' : true
  //         },
  //         'children' : [
  //           { 'text' : 'Child 1' },
  //           'Child 2'
  //         ]
  //       }
  //     ]
  //   },
    
  //   "plugins": ["themes", "types", "json_data", "ui", "dnd"],

  //   // set a theme
  //   "themes": {
  //     "theme": "proton",
  //   },
  // });
  
  $("#bookmarks").jstree({
                  "json_data" : {
                     "data" : [
                         {
                             "data" : {
                                 "title" : "Electronics",
                                 "attr" : { "href" : "#" }
                             },
                             "attr" : { "id" : "node1" },
                             "children" : [
                                 {
                                     "data" : {
                                         "title" : "Other Electronics",
                                         "attr" : { "href" : "#" }
                                     },
                                     "attr" : { "rel": "product-category" }
                                 },
                                 {
                                     "data" : {
                                         "title" : "TV",
                                         "attr" : { "href" : "#" }
                                     },
                                     "attr" : { "rel": "product-category" }
                                 },
                                 {
                                     "data" : {
                                         "title" : "DVD Players",
                                         "attr" : { "href" : "#" }
                                     },
                                     "attr" : { "id" : "node2", "class" : "jstree-checked", "rel": "product-category-master" },
                                     "children" : [
                                         {
                                             "data" : {
                                                 "title" : "Model Name 1",
                                                 "attr" : { "href" : "#" }
                                             },
                                             "attr" : { "rel": "file" }
                                         },
                                         {
                                             "data" : {
                                                 "title" : "Model Name 2",
                                                 "attr" : { "href" : "#" }
                                             },
                                             "attr" : { "rel": "file" }
                                         },
                                         {
                                             "data" : {
                                                 "title" : "Model Name 3",
                                                 "attr" : { "href" : "#" }
                                             },
                                             "attr" : { "rel": "file" }
                                         },
                                     ]
                                 },
                                 {
                                     "data" : {
                                         "title" : "GPS",
                                         "attr" : { "href" : "#" }
                                     },
                                     "attr" : { "rel": "product-category" }
                                 },
                                 {
                                     "data" : {
                                         "title" : "Home Audio",
                                         "attr" : { "href" : "#" }
                                     },
                                     "attr" : { "rel": "product-category" }
                                 }
                             ]
                         },
                         {
                             "data" : {
                                 "title" : "Software",
                                 "attr" : { "href" : "#" }
                             }
                         },
                         {
                             "data" : {
                                 "title" : "Mobile",
                                 "attr" : { "href" : "#" }
                             }
                         },
                         {
                             "data" : {
                                 "title" : "Web Services",
                                 "attr" : { "href" : "#" }
                             }
                         }
                     ]
                 },
                 "types" : {
// I set both options to -2, as I do not need depth and children count checking
// Those two checks may slow jstree a lot, so use only when needed
"max_depth" : -2,
"max_children" : -2,
// I want only `drive` nodes to be root nodes
// This will prevent moving or creating any other type as a root node
"valid_children" : [ "folder" ],
"types" : {
	// The default type
	"default" : {
		"valid_children" : "all",
                                     "check_node" : false,
                                     "uncheck_node" : false
	},
	"file" : {
		"valid_children" : "none",
	},
                             "product-category": {
		"valid_children" : "file",
                                     "check_node" : true,
                                     "uncheck_node" : true
                             },
                             "product-category-master": {
		"valid_children" : "file",
                             }
                     },
                 },
                 "plugins" : [ "themes", "types", "json_data", "ui", "dnd" ],
                 "ui" : {
                     "initially_select" : [ "node3" ]
                 },
                 "core" : {
                     "initially_open" : [ "node1" , "node2" ]
                 },
                 // set a theme
		"themes" : {
            "theme" : "proton",
        }
  });
});