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

var data = [
    {
        label: 'node1',
        children: [
            { label: 'child1' },
            { label: 'child2' }
        ]
    },
    {
        label: 'node2',
        children: [
            { label: 'child3' }
        ]
    },
];

$('#bookmarks').tree({
    data: data,
    autoOpen: true,
    dragAndDrop: true,
});

$('#bookmarks').bind(
    'tree.move',
    function(event) {
        console.log('moved_node', event.move_info.moved_node);
        console.log('target_node', event.move_info.target_node);
        console.log('position', event.move_info.position);
        console.log('previous_parent', event.move_info.previous_parent);
    }
);

$(function() {
    $( "#draggable3" ).draggable({
      revert: true,
      helper: function( event ) {
        return $( "<span class='jqtree-title jqtree-dragging'>Ball</span>" );
      },
    });
  });