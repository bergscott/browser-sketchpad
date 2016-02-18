$(document).ready(function() {
    buildSketchpad(16);
    mouseListen_v2();
    $('#reset').click(function() {
        var user = +prompt('Generating new sketchpad.\nHow many boxes per side?');
	if (user > 0) {
	    $('#sketchpad').empty();
	    setSize(user);
	    buildSketchpad(user);
	    mouseListen_v2();
	}
    });
});

var mouseListen = function() {
    $('#sketchpad .tile').mouseenter(function() {
	$(this).addClass('active');
    });
};

var mouseListen_v2 = function() {
    $('#sketchpad .tile').mouseenter(function() {
	if (document.getElementById('crazy').checked) {
	    $(this).css({'background-color': getRandomColor()});
	    $(this).addClass('active');
	} else if ($(this).hasClass('active')) {
	    var newColor = getDarkerColor($(this).css('background-color'));
	    $(this).css({'background-color': newColor});
	} else {
	    $(this).addClass('active');
	}
    });
};

var getRandomColor = function() {
    var get256 = function() {
	return Math.floor(Math.random()*256);
    };
    var red = get256();
    var blue = get256();
    var green = get256();
    return 'rgb('+red+','+blue+','+green+')';
};

var getDarkerColor = function(color) {
    var parseRGB_blue = function(color) {
	var result = [];
	var result_index = 0;
	var sub_start = 4;
	for (var i = 4; i < color.length; i++) {
	    if (color[i] === ',' || color[i] === ')') {
		result[result_index] = color.substring(sub_start, i);
		sub_start = i+1;
		result_index++;
	    }
	}
	return result[2];
    }
    var blue = +parseRGB_blue(color);
    blue -= 13;
    if (blue < 0) {
	blue = 0;
    } else if (blue > 128) {
	blue = 128;
    }
    return 'rgb(0,0,'+blue+')';
};

var makeRow = function(colCount) {
    var result = '';
    for (var i = 0; i < colCount; i++) {
	result += '<div class="tile"></div>';
    }
    return "<div class='row'>"+result+"</div>";
};

var addRows = function(row, rowCount) {
    var $fragment = $(document.createDocumentFragment());
    for (var i = 0; i < rowCount; i++) {
	$fragment.append(row);
    }
    $('#sketchpad').append($fragment);
};
var buildSketchpad = function(size) {
    var divrow = makeRow(size);
    addRows(divrow, size);
};

var setSize = function(size) {
    var $style = $('style');
    var dimension = 800 / size;
    if (dimension * size > 800) {
	dimension -= (dimension * size - 800) / size;
    }
    dimension += 'px';
    var selector = '#sketchpad .row .tile';
    var attributes = '{width: '+dimension+'; height: '+dimension+';}';
    $style.empty();
    $style.append(selector + ' ' + attributes);
};
