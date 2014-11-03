"use strict";


var mouseX = null;
var mouseY = null;
var graphExists = false;
var eTarget = null;
var newMap = null;
var maps = [];
var fileName = "";
var newGraph = null;
var map = null;
var node = null;
document.addEventListener('DOMContentLoaded', onReady);


	//hover with wait function
	//so it appears where your curser is, not where you go into the path
	//WORKS

function onReady() {
	loadButtons();
	addToggle();
	loadMainMap('Beats', 'Maps', true);
}


function addToggle() {
	//makes checkboxes into toggle functions
	$('input[type=checkbox]#mapCheckbox').click(function() {
		var currName = this.name;
		loadMap(currName, 'Maps', false);
	});
}

function loadMainMap(beatName, divName, addEvents) {
	var node = loadMap(beatName, divName, addEvents)
}


function loadMap(beatName, divName, addEvents) {
	var svgName = "Maps/" + beatName + ".svg";
	//loads the file if unloaded
	if(!(maps.indexOf(svgName) > -1)) {
		fileName = 'Maps/' + beatName + '.svg'
		$.get(fileName, function(data) {
			node = data.children[0];
			node.setAttribute('class', 'Map');
			node.setAttribute('id', beatName + "Map");
			node.style.visibility = 'visible';
			document.getElementById(divName).appendChild(node);
			maps.push(svgName)
			if (addEvents) {
				document.getElementById('Maps').style.height = (.8 * node.height.animVal.value) + 'px'
				document.getElementById('checkboxesContainer').style.height = (.8 * node.height.animVal.value) + 'px'
				addMainMapEventListeners();
			}
		});
	}
	//hides/makes visible if map is already loaded
	else {
		map = document.getElementById(beatName + 'Map');
		if (map.style.visibility == "hidden") {
			map.style.visibility = 'visible';	
		} else {
			map.style.visibility = 'hidden';
		}
	}
}

function addMainMapEventListeners() {
	var svg = document.getElementById('BeatsMap');
	var paths = svg.getElementsByTagName('path');
	for (var i = 0; i < paths.length; i++) {
		var element = paths[i]
		element.addEventListener('mouseover', function(e) {
			mouseX = e.pageX;
	   		mouseY = e.pageY;
		});

		//creats/moves the actual div with graphs
		element.addEventListener('click', function(e) {
   			//creats a wait
   			if(mouseX == null || mouseY == null) {
   				mouseX = e.pageX;
   				mouseY = e.pageY;
   			}

			var graphs = document.getElementById('graphImage')
			document.getElementById('graphsTitle').innerHTML = "Time Pattern Data for Beat " + this.id
			fileName = "graphs/" + this.id + "_densitybarplots.svg"
			graphs.setAttribute('src', fileName);

			var googleMapsFrame = document.getElementById('googleMapsFrame');
			document.getElementById('googleMapsTitle').innerHTML = 'Interactable Google Map of Crime in Beat ' + this.id;
			fileName = "googlemaps_by_beat/" + this.id + "_crime_map.html"
			googleMapsFrame.setAttribute('src', fileName);
			googleMapsFrame.style.visibility = 'visible'
		});
	};
}

function loadButtons() {
	var buttonNames = ['All Crime', 'Drug Crime', 'Non-Theft Property Crime', 'Public Disturbance',
		'Theft', 'Traffic', 'Vice', 'White-Collar Crime', 'Violent Crime', 'Other'];
	var checkboxList = document.getElementById('checkboxes');
	buttonNames.forEach(function(buttonName) {
		var box = document.createElement('input')
		box.type = 'checkbox'
		box.name = buttonName;
		box.id = 'mapCheckbox'

		var label = document.createElement('label');
		label.appendChild(document.createTextNode(buttonName));

		checkboxList.appendChild(box)
		checkboxList.appendChild(label);
		checkboxList.appendChild(document.createElement('br'))
	});
}