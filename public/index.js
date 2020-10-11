// Event listeners
//On Load
window.addEventListener("load", () => {
	console.log("Loaded");
});
 
function keepLevels() {

		//Items
		if (localStorage.getItem('Car')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "Car";
			textNode.id = "Car";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Pan')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "Pan";
			textNode.id = "Pan";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Garden')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "Garden";
			textNode.id = "Garden";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Van')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "Van";
			textNode.id = "Van";
			header.appendChild(textNode);

		}

		if (

			!localStorage.getItem('Car')
			&& !localStorage.getItem('Pan')
			&& !localStorage.getItem('Garden')
			&& !localStorage.getItem('Van')

		) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "You have no items.";
			textNode.id = "noitem";
			header.appendChild(textNode);

		}

}

function preventMultiBuy() {

	//Keep levels
		document.getElementById("showshop").removeAttribute("hidden");

		//Items
		if (localStorage.getItem('Car')) {

      document.getElementById('carBuy').innerHTML = "You bought this item.";
      document.getElementById('carBuy').setAttribute('disabled', 'disabled');

		}
		if (localStorage.getItem('Pan')) {

      document.getElementById('panBuy').innerHTML = "You bought this item.";
      document.getElementById('panBuy').setAttribute('disabled', 'disabled');

		}
		if (localStorage.getItem('Garden')) {

      document.getElementById('gardenBuy').innerHTML = "You bought this item.";
      document.getElementById('gardenBuy').setAttribute('disabled', 'disabled');

		}
		if (localStorage.getItem('Van')) {

      document.getElementById('vanBuy').innerHTML = "You bought this item.";
      document.getElementById('vanBuy').setAttribute('disabled', 'disabled');

		}

}


//Points (Argens) & experience
var points = 1;
var exp = 1;
//Username...
var username = "Unnamed User"

//Keep stuff
if (localStorage.getItem('points')) {
	points = parseInt(localStorage.getItem('points'), 10);
} else {
	localStorage.setItem('points', points);
};

if (localStorage.getItem('exp')) {
	exp = parseInt(localStorage.getItem('exp'), 10);
} else {
	localStorage.setItem('exp', exp);
};

if (localStorage.getItem('username')) {
	username = localStorage.getItem('username');
} else {
	localStorage.setItem('username', username);
};

//Add, remove points function.
//All point related functions
function addpoints(n = 0) {

	points = parseInt(points, 10) + n;
	localStorage.setItem('points', points);

}

function removepoints(n = 0) {

	points = parseInt(points, 10) - n;
	localStorage.setItem('points', points);

}

function clearpoints() {

	points = 0;
	localStorage.setItem('points', points);

}
//End