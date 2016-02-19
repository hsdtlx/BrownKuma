var editor = 0;
var dataHorizontal = [];
var dataVertical = [];
var line = 0;

$(document).ready(function(){
	$('.startButton').click(startDraw);
})
function startDraw(){
	line = parseInt($('.start').val());
	var boxWidth = line * 20;
	$('.DBCbox').width(boxWidth).height(boxWidth);

	for (var lineHorizontal = 0; lineHorizontal < line; lineHorizontal++){
		for (var lineVertical = 0; lineVertical < line; lineVertical++){
			$('<div class="DBCdiv"></div>')
				.css({
					"float": "left",
					"width": "18px",
					"height": "18px",
					"border-style": "solid",
					"border-width": "1px"
				}).click(changeColor).appendTo('.DBCbox');
		}
	}

	$('<button class="endButton">完成了</button>').click(endDraw).appendTo('.buttonBox');
	$('.start').hide();
	$('.startButton').hide();
};

function changeColor(){
	if (editor == 0){
		$(this).toggleClass('black');
		var Color = $(this).css("background-color");
		var DBCDivColor = (Color == "rgb(0, 0, 0)") ? "white" : "black";
		$(this).css("background-color",DBCDivColor);
	}
}

function endDraw(){
	editor = 1;
	if (!$('.reDraw').hasClass('reDraw')){
		$('<button class="reDraw">重新编辑</button>').click(reDraw).appendTo('.buttonBox');
		$('<div class="answer"></div>')
			.css({
				"margin": "auto",
				"width": "1000px",
				"height": "auto"
			}).appendTo('body');
	}

	for (var a = 0; a < line; a++){
		var horizontal = [];
		var x = 0;
		var y = 0;
		for (var b = 0; b < line; b++){
			if ($($('.DBCdiv')[a * line + b]).hasClass('black')){
				x++;
				y = 0;
			}else{
				if (y == 0){
					horizontal.push(x);
					x = 0;
				}
				y = 1;
			}
			if (b == line - 1 && y == 0){
				horizontal.push(x);
			}
		}
		if (horizontal[0] == 0){
			horizontal.shift();
		}
		alert(horizontal);
		dataHorizontal[a] = horizontal;
	}


	for (var a = 0; a < line; a++){
		var vertical = [];
		var x = 0;
		var y = 0;
		for (var b = 0; b < line; b++){
			if ($($('.DBCdiv')[a + b * line]).hasClass('black')){
				x++;
				y = 0;
			}else{
				if (y == 0){
					vertical.push(x);
					x = 0;
				}
				y = 1;
			}
			if (b == line - 1 && y == 0){
				vertical.push(x);
			}
		}
		if (vertical[0] == 0){
			vertical.shift();
		}
		alert(vertical);
		dataVertical[a] = vertical;

	}

}

function reDraw(){
	editor = 0;
}

//29