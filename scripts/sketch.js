$(document).ready(function() {
    buildSketchpad_v2(16);
    mouseListen();
    $('#reset').click(function() {
        $('#sketchpad').empty();
        var user = +prompt('Generating new sketchpad.\nHow many boxes per side?');
        setSize(user);
        buildSketchpad_v2(user);
        mouseListen();
    });
});

var mouseListen = function() {
    $('#sketchpad .tile').mouseenter(function() {
	$(this).addClass('active');
    });
};

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

var addRows = function(row, rowCount) {
    var $fragment = $(document.createDocumentFragment());
    for (var i = 0; i < rowCount; i++) {
	$fragment.append(row);
    }
    $('#sketchpad').append($fragment);
};
var buildSketchpad_v2 = function(size) {
    var divrow = makeRow(size);
    addRows(divrow, size);
};

var setSize = function(size) {
    var $style = $('style');
    var dimension = 800 / size;
    dimension += 'px';
    var selector = '#sketchpad .row .tile';
    var attributes = '{width: '+dimension+'; height: '+dimension+';}';
    $style.empty();
    $style.append(selector + ' ' + attributes);
};
