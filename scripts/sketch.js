var MAXBLUE = 128;
var TOBLACK = 10;
var BLACKADD = Math.ceil(MAXBLUE / TOBLACK);
var INITSIZE = 16;
var PADPIXELS = 800;

$(document).ready(function() {
    var padSize = INITSIZE;
    buildSketchpad(padSize);
    mouseListen();
    $('#reset').click(function() {
        var user = +prompt(
	    'Generating new sketchpad.\nHow many boxes per side?',
	    padSize);
	if (user > 0) {
	    $('#sketchpad').empty();
	    padSize = user;
	    setSize(padSize);
	    buildSketchpad(padSize);
	    mouseListen();
	}
    });
});

var buildSketchpad = function(size) {
    var divrow = makeRow(size);
    addRows(divrow, size);
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

var setSize = function(size) {
    var $style = $('style');
    var dimension = PADPIXELS / size;
    dimension += 'px';
    var selector = '#sketchpad .row .tile';
    var attributes = '{width: '+dimension+'; height: '+dimension+';}';
    $style.empty();
    $style.append(selector + ' ' + attributes);
};

var mouseListen = function() {
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
    var randRGBVal = function() {
	return Math.floor(Math.random()*256);
    };
    return 'rgb('+randRGBVal()+','+randRGBVal()+','+randRGBVal()+')';
};

var getDarkerColor = function(color) {
    var blue = +parseRGB(color)[2];
    blue -= BLACKADD;
    if (blue < 0) {
	blue = 0;
    } else if (blue > MAXBLUE) {
	blue = MAXBLUE;
    }
    return 'rgb(0,0,'+blue+')';
};

// string -> array of 3 strings
// parseRGB takes a string 'color' in the format of a CSS RGB color value
// and returns an array of strings corresoponding to 
// [redValue, greenValue, blueValue]
// example: parseRGB("rgb(0,30,255)") -> ["0", "30", "255"]
var parseRGB = function(color) {
    var result = [];
    var result_index = 0;
    // loop starts at 4 to discard "rgb(" from start of color string
    var sub_start = 4;
    for (var i = 4; i < color.length; i++) {
	if (color[i] === ',' || color[i] === ')') {
	    result[result_index] = color.substring(sub_start, i);
	    sub_start = i+1;
	    result_index++;
	}
    }
    return result;
};

