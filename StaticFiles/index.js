window.onload = function() {
	grid = $(".grid");
	canPlay = true;
//Extracting data from JSON file
	JSONdata = $.getJSON("binds.json", function(data) {
			binds = data.binds;
			loadBtns();
	});
//Adding Event listeners to buttons in a grid
	$("body")[0].addEventListener('keydown', function(event){
			var code = event.keyCode || event.which;
			jQuery.each(binds, function(i,val) {
				code == val.key ? play(val.id): console.log();
				return;
			})
		})

// Creating into Grid
function loadBtns(){
	for (row = 0; row < 8; row++){
		for (item = 0; item < 8; item++){
			grid.append(`<div id="row${row+1}item${item+1}" class="grid-item"></div>`);
		}
	}
	console.log("Buttons were summnoned succesfuly.");
	equipBtns();
}

//Giving each button their properties
function equipBtns(){
	//It's just like for loop, but for JS Object.
	jQuery.each(binds, function(i, val) {
	  var btn = $(`#${i}`);
		val.hasGradient=="true" ? btn.css("background", `radial-gradient(circle, white 1%, ${val.color} 50%, #191919 99%`) : btn.css("background-color", val.color);
		btn.attr("data-color", val.color);
	});

	$('.grid-item').bind('click', function(){
			openModal($(this).attr('id'));
	});
	console.log("Buttons were equipped succesfuly");
}

}

//Modal functions
function openModal(id){
	canPlay = false;
	//Doesn't require button
	$("#modalName").html("Configure");
	$("#modalName").attr("value", id);
	//Error checking - In case the button doesn't exist
	if (binds[id] == undefined){
		$(".modal").fadeIn();
	}
	//If button exists, load his properties
	else{
		//Using property instead of val() or attr() cuz those 2 cmnds are loading hard coded value... prop() is loading a actual value whic user see
		$("#color").prop("value", binds[id].color);
		$("#fx").prop("value", binds[id].effect);
		$("#gradientCheck").prop("checked", binds[id].hasGradient=="true" ? true : false );
		$("#key").prop("value", binds[id].key == null ? 'Click me!' : binds[id].key);
		//Targeting and showing modal
		$(".modal").fadeIn();
	}
}
//Name just explains itself
function closeModal(){
	canPlay = true;
	$(".modal").fadeOut();
}

///Key binding
function boundKey(){
	$("#key").on("keydown", function(event){
		$("#key").attr("value", event.keyCode);
		$("#key").off("keydown");
	})
}
//Very much self-explanatory
function play(id){
	if (canPlay){
	let altid;
	let audio = $(".a"+altid);
	//This line of code is checking if another element with same id exist, if so, it'll assign numbered value from 0 to 1000
	audio.length == 1 ? altid=Math.round((1000*Math.random())) : altid = id;
	//Temporary creating a audio element to play desired sound
	$(".audioElements").append(`<audio class="a${altid}"><source src="Samples/${binds[id].sample}"></source></audio>`);
	//Triggering sound
	$(".a"+altid)[0].play();

	playFX(binds[id].effect);
	}
	else{
		console.log("Playing Temporarily Disabled");
	}
}

function playFX(fx){
		let fxs = fx.split(";");
		for (var i = 0; i <= fxs.length; i++){
			var placeholderFunction = new Function(fxs[i]);
			placeholderFunction();
		}
}



function flash(id, duration, interval){
	binds[id].hasGradient=="true" ? $("#"+id).css("background", `radial-gradient(circle, white 1%, ${binds[id].color} 50%`) : $("#"+id).css("background", "white");
	setTimeout(function(){binds[id].hasGradient=="true" ? $("#"+id).css("background", `radial-gradient(circle, white 1%, ${binds[id].color} 50%, #191919 99%`) : $("#"+id).css("background-color", binds[id].color);}, Number(duration));
}
function bg_Flash(color, duration, interval){

}
function lightUp(id, color){
	//Checking if color argument was passed
	let color = color || binds[id].color;

	binds[id].hasGradient=="true" ? $("#"+id).css("background", `radial-gradient(circle, white 1%, ${color} 50%`) : $("#"+id).css("background", "white");
	$(".a"+altid).on('ended', function() {
		binds[id].hasGradient=="true" ? $("#"+id).css("background", `radial-gradient(circle, white 1%, ${color} 50%, #191919 99%`) : $("#"+id).css("background-color", color);
	});
}


//Method called after clicking the submit button in modal window
function submit(){
	//Doesn't require error-check cuz it's automaticly filled by another method.
	var id_ = $("#modalName").attr('value');

	//Color has dropdown menu, again, nothing to check;
	var color_ = $("#color").prop('value');

	var effect_ = $("#fx").prop('value');
	//Setting up default effect if field is empty, undefined or null
	effect_ = effect_ || 'stayuntilgone'
	//Checkbox has only two states and both of them are valid - Nothing to check then.
	var hasGradient_ = false;
	if ($('#gradientCheck').is(":checked")){
			hasGradient_=true;
	}
	//In case of invalid input it'll put a link to default sound
	var sample_ = $('#fileName').val();
	sample_ = sample_.split("\\"); //Double \ because this symbol is used for escaping a string... so it's escaping itself *Mind blows*
	sample_[2] = sample_[2] || binds[id_].sample || 'defaultsound.mp3';

	//It'll fill 'null' if key isn't assigned, so the error checking is done
	var key_ = $("#key").val();

	$.post( "/submitData", {
		 id: id_,
		 color: color_,
		 effect: effect_,
		 hasGradient: hasGradient_,
		 sample: sample_[2],
		 key: key_
	 } );
	//Visual signal for user that data were submitted and closing modal window;
	alert("Data were saved!");
	closeModal();
	//Reloading page
	location.reload();
}
