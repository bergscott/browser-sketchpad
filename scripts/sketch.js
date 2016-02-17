$(document).ready(function() {
    var divrow = makeRow(16);
    buildSketchpad(divrow, 16);
    $('#sketchpad .tile').hover(
	function() {
	    $(this).addClass('active');
	},
	function() {
	    //$(this).removeClass('active');
	});
});

var makeRow = function(colCount) {
    var result = '';
    for (var i = 0; i < colCount; i++) {
	result += '<div class="tile"></div>';
    }
    return "<div class='row'>"+result+"</div>";
};

var buildSketchpad = function(row, rowCount) {
    var $target = $('#sketchpad');
    for (var i = 0; i < rowCount; i++) {
	$target.append(row);
    }
};
