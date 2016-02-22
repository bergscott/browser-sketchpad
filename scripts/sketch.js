// Script for Browser Sketchpad by Scott Berg

// --------------------------CONSTANT DEFINITIONS------------------------------
var MAXBLUE = 128;
var TOBLACK = 10;
var DEFAULT_DECREMENT = [0,0,Math.ceil(MAXBLUE / TOBLACK)];
var INITSIZE = 16;
var PADPIXELS = 800;
var STANDARD_COLOR = "rgb(0,0,"+MAXBLUE+")";
var MAXSIZE = 200;

//------------------------------MAIN FUNCTION----------------------------------

// Builds the initial sketchpad and sets up event listeners for mousing over
// tiles and clicking the reset button.
$(document).ready(function() {
    var padSize = INITSIZE;
    buildSketchpad(padSize);
    mouseListen();
    // clicking reset prompts for new sketchpad size and generates new sketchpad
    $('#reset').click(function() {
        var user = +prompt(
	    '\tGenerating new sketchpad.\n' +
	    'How many boxes per side (1-'+MAXSIZE+')?',
	    padSize);
	// ignore non-positive-integer inputs
	if (user > MAXSIZE) {
	    alert("Maximum boxes per side is "+MAXSIZE);
	} else if (user > 0) {
	    $('#sketchpad').empty();
	    padSize = user;
	    setSize(padSize);
	    buildSketchpad(padSize);
	    mouseListen();
	}
    });
});

//---------------------------FUNCTION DEFINITIONS------------------------------

// buildSketchpad creates a 800x800px sketchpad with a resolution of interger
// SIZE x SIZE tiles
var buildSketchpad = function(size) {
    var divrow = makeRow(size);
    addRows(divrow, size);
};

// makeRow returns a html string of a .row div containing int COLCOUNT 
// .tile divs
var makeRow = function(colCount) {
    var result = '';
    for (var i = 0; i < colCount; i++) {
	result += '<div class="tile"></div>';
    }
    return "<div class='row'>"+result+"</div>";
};

// addRows takes html string ROW and appends it to the sketchpad int ROWCOUNT 
// times
var addRows = function(row, rowCount) {
    var $fragment = $(document.createDocumentFragment());
    for (var i = 0; i < rowCount; i++) {
	$fragment.append(row);
    }
    $('#sketchpad').append($fragment);
};

// setSize sets the pixel width and height of sketchpad tiles based on the 
// number of tiles per side requested, SIZE
var setSize = function(size) {
    var $style = $('style');
    var dimension = PADPIXELS / size;
    dimension += 'px';
    var selector = '#sketchpad .row .tile';
    var attributes = '{width: '+dimension+'; height: '+dimension+';}';
    $style.empty();
    $style.append(selector + ' ' + attributes);
};

// mouseListen is an event listener that listens for when the mouse enters a 
// tile of the sketchpad and triggers a color change based on the tile's state 
// and mode of sketchpad (crazy/standard) 
var mouseListen = function() {
    $('#sketchpad .tile').mouseenter(function() {
	var $this = $(this);
	// crazy colors mode
	if (document.getElementById('crazy').checked) {
	    if ($this.hasClass('crazy')) {
		darkenColor($this);
	    } else {
		initializeColor($this, getRandomColor());
		$this.addClass('crazy');
	    }
	// standard mode
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

// darkenColor changes the CSS background-color of jQuery object $TILE to a
// color 10% (relative to $TILE's original color) closer to black
var darkenColor = function($tile) {
    var newColor = getDarkerColor($tile);
    $tile.css({'background-color': newColor});
};

// getRandomColor returns a string representation of a random RGB color
// example: "rgb(33,255,0)"
var getRandomColor = function() {
    return 'rgb('+randRGBVal()+','+randRGBVal()+','+randRGBVal()+')';
};

// randRGBVal returns a random integer between 0 and 255, inclusive
var randRGBVal = function() {
    return Math.floor(Math.random()*256);
};

// getDarkerColor returns a string representation of the RGB color that is
// 10% closer to back than jQuery object $TILE's current color. Percentage 
// black is based off of $TILE's initial color. Amount to subtract from
// current RGB values to calculate darker color is stored as data attribute
// 'blackDecrement' for crazy colors mode or defined constant DEFAULT_DECREMENT
// for standard mode.
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
