$(document).ready(function() {
    var divrow = makeRow(16);
    buildSketchpad(divrow, 16);
    $('#sketchpad .tile').mouseenter(function() {
	$(this).addClass('active');
    });
    $('#reset').click(function() {
	$('#sketchpad .active').removeClass('active');
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
    var $fragment = $(document.createDocumentFragment());
    for (var i = 0; i < rowCount; i++) {
	$fragment.append(row);
    }
    $('#sketchpad').append($fragment);
};
