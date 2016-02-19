var MAXBLUE = 128;
var TOBLACK = 10;
var DEFAULT_DECREMENT = [0,0,Math.ceil(MAXBLUE / TOBLACK)];
var INITSIZE = 16;
var PADPIXELS = 800;
var STANDARD_COLOR = "rgb(0,0,"+MAXBLUE+")";

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
	var $this = $(this);
	if (document.getElementById('crazy').checked) {
	    if ($this.hasClass('crazy')) {
		darkenColor($this);
	    } else {
		initializeColor($this, getRandomColor());
		$this.addClass('crazy');
	    }
	} else if ($this.hasClass('active') && !$this.hasClass('crazy')) {
	    darkenColor($this);
	} else {
	    if ($this.hasClass('crazy')) {
		$this.removeClass('crazy');
		$this.css({'background-color': ''}); //clear inline style
	    }
	    $this.addClass('active');
	}
    });
};

// initializeColor changes the background-color of jQuery object, $TILE, to
// the string value of COLOR. Adds corresponding blackDecrement data to $TILE.
var initializeColor = function($tile, color) {
    $tile.css({'background-color': color});
    $tile.data('blackDecrement', getDecrementVals(color));
};

// string -> array of integers
// getDecrementVals calculates and returns an array of integer values that
// can be subtracted from the values of RGB color, COLOR, TOBLACK (defined 
// constant) times to turn it to black (rgb(0,0,0))
var getDecrementVals = function(color) {
    var RGBvals = parseRGB(color);
    var decrementVals = [0,0,0];
    for (var i = 0; i < RGBvals.length; i++) {
	decrementVals[i] = Math.ceil(RGBvals[i] / TOBLACK);
    }
    return decrementVals;
};

var darkenColor = function($tile) {
    var newColor = getDarkerColor($tile);
    $tile.css({'background-color': newColor});
};

var getRandomColor = function() {
    var randRGBVal = function() {
	return Math.floor(Math.random()*256);
    };
    return 'rgb('+randRGBVal()+','+randRGBVal()+','+randRGBVal()+')';
};

var getDarkerColor = function($tile) {
    currentColor = parseRGB($tile.css('background-color'));
    var decrement = DEFAULT_DECREMENT;
    if ($tile.hasClass('crazy')) {
	decrement = $tile.data('blackDecrement');
    }
    var newColor = [];
    for (var i = 0; i < currentColor.length; i++) {
	newColor[i] = currentColor[i] - decrement[i];
    }
    return 'rgb('+newColor[0]+','+newColor[1]+','+newColor[2]+')';
};

// string -> array of 3 int
// parseRGB takes a string 'color' in the format of a CSS RGB color value
// and returns an array of integers corresoponding to 
// [redValue, greenValue, blueValue]
// example: parseRGB("rgb(0,30,255)") -> [0, 30, 255]
var parseRGB = function(color) {
    var result = [];
    var result_index = 0;
    // loop starts at 4 to discard "rgb(" from start of color string
    var sub_start = 4;
    for (var i = 4; i < color.length; i++) {
	if (color[i] === ',' || color[i] === ')') {
	    result[result_index] = +color.substring(sub_start, i);
	    sub_start = i+1;
	    result_index++;
	}
    }
    return result;
};

