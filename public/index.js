// Event listeners
//On Load
window.addEventListener("load", () => {
	console.log("Main module loaded");
});
 
function keepLevels() {


		// Checks for inventory items and adds it onto the collection list.
		//Items
		if (localStorage.getItem('Car')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "🚗 <b>Car</b> | Tip: Use it in the taxi game!";
			textNode.id = "Car";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Pan')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "🍳 <b>Pan</b> | Tip: Use it in the cooking game!";
			textNode.id = "Pan";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Garden')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "🌿 <b>Garden</b> | Tip: Use it in the plants game!";
			textNode.id = "Garden";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Van')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "🚚 <b>Van</b> | Tip: Use it in the delivery game!";
			textNode.id = "Van";
			header.appendChild(textNode);

		}
		//💲
		if (localStorage.getItem('Frisbee')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "🥏 <b>Frisbee</b> | A toy, try playing with it";
			textNode.id = "Frisbee";
			header.appendChild(textNode);

		}
		if (localStorage.getItem('Coupon')) {

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "💲 <b>Coupon</b> | Save money on purchases";
			textNode.id = "Frisbee";
			header.appendChild(textNode);

		}

		if ( // Checks if the user has no items at all.

			!localStorage.getItem('Car')
			&& !localStorage.getItem('Pan')
			&& !localStorage.getItem('Garden')
			&& !localStorage.getItem('Van')
			&& !localStorage.getItem('Frisbee')
			&& !localStorage.getItem('Coupon')

		) {

			// If the user has no items, append a note saying there is no items.

			var header = document.getElementById('collectionlist');
			var textNode = document.createElement("p");
			textNode.innerHTML = "You have no items.";
			textNode.id = "noitem";
			header.appendChild(textNode);

		}

}

function preventMultiBuy() { // Prevents users from buying more than 1 item, by disabling the buy buttons.

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
		if (localStorage.getItem('Frisbee')) {

      document.getElementById('frisbeeBuy').innerHTML = "You bought this item.";
      document.getElementById('frisbeeBuy').setAttribute('disabled', 'disabled');

		}
		if (localStorage.getItem('Coupon')) {

      document.getElementById('couponBuy').innerHTML = "You bought this item.";
      document.getElementById('couponBuy').setAttribute('disabled', 'disabled');

		}

}


//Points (Argens) & experience
var points = 1;
var exp = 1;
//Username...
var username = "Unnamed User";
//Last online users data for page
var onlineusers = ""
// User's about section
var userabout = ""

// Take the user's points from the localStorage and implement it as a local variable
if (localStorage.getItem('points')) {
	points = parseInt(localStorage.getItem('points'), 10);
} else {
	localStorage.setItem('points', points);
};

// Do the same thing above with EXP
if (localStorage.getItem('exp')) {
	exp = parseInt(localStorage.getItem('exp'), 10);
} else {
	localStorage.setItem('exp', exp);
};

// Get user's name
if (localStorage.getItem('username')) {
	username = localStorage.getItem('username');
} else {
	localStorage.setItem('username', username);
};

// Get user's about section
if (localStorage.getItem('userabout')) {
	userabout = localStorage.getItem('userabout');
} else {
	localStorage.setItem('userabout', userabout);
};

//Add, remove points function.
//All point related functions
function addpoints(n = 0) {

	points = points + n;
	localStorage.setItem('points', points);

}

function removepoints(n = 0) {

	points = points - n;
	localStorage.setItem('points', points);

}

function clearpoints() {

	points = 0;
	localStorage.setItem('points', points);

}