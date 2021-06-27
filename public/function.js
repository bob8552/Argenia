// Functions and Methods
console.log("General functions loaded");

// Back to top button
let backtotopbutton = document.getElementById("backtotop");
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backtotopbutton.style.display = "block";
  } else {
    backtotopbutton.style.display = "none";
  }
}

// Set the page view to the top
function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Clear points
function clearM() {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Reset money'
  })

    .then((result) => {

      if (result.value) {

        Swal.fire('All of your Argens has been removed.');
        clearpoints();
				document.getElementById('points').innerHTML = points;

      }
    })

}

// Clear EXP level
function clearE() {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Reset EXP'
  })

    .then((result) => {

      if (result.value) {
        Swal.fire('Your EXP level has been reset.')

        exp = 0;
        document.getElementById('exp').innerHTML = exp;
        localStorage.setItem('exp', exp)

      }
    })

}

// Remove the player's item collection
function removeCollection() {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove ALL items'
  })

    .then((result) => {

      if (result.value) {
        Swal.fire('All of your items have been removed.')

        localStorage.removeItem('Car');
        localStorage.removeItem('Pan');
        localStorage.removeItem('Garden');
        localStorage.removeItem('Van');
				localStorage.removeItem('Frisbee');
				localStorage.removeItem('Coupon');

        if (document.getElementById('noitem')) {
          document.getElementById('noitem').remove();
        }

        if (document.getElementById('Car')) {
          document.getElementById('Car').remove();
        }

        if (document.getElementById('Pan')) {
          document.getElementById('Pan').remove();
        }

        if (document.getElementById('Garden')) {
          document.getElementById('Garden').remove();
        }

        if (document.getElementById('Van')) {
          document.getElementById('Van').remove();
        }

				if (document.getElementById('Frisbee')) {
          document.getElementById('Frisbee').remove();
        }

				if (document.getElementById('Coupon')) {
          document.getElementById('Coupon').remove();
        }

        var header = document.getElementById('collectionlist');
        var textNode = document.createElement("p");
        textNode.innerHTML = "You have no items.";
        textNode.id = "noitem";
        header.appendChild(textNode);

      }

    })


}

//Buy
function buy(name, price, elementToDisable, nickname) {

  if (!nickname) nickname = name;
  if (points < price) return Swal.fire("You don't have enough points!");

  let confirmString = `Your purchase of ${nickname} was successful!`;

  if (localStorage.getItem('Coupon')) {
    price = price / 10 * 9;
    confirmString = `Your purchase of ${nickname} was successful - You used your coupon so that your purchase only costed ${price} argens!`
  }

  removepoints(price);

  Swal.fire(confirmString);

  localStorage.setItem(name, true)

  document.getElementById(elementToDisable).setAttribute('disabled', 'disabled');
  document.getElementById(elementToDisable).innerHTML = "You bought this item.";

}

function basicbuy(name) {

  localStorage.setItem(name, true);

  //Adding stuff to the collection
  var header = document.getElementById('collectionlist');
  var textNode = document.createElement("p");
  textNode.innerHTML = name;
  textNode.id = name;
  header.appendChild(textNode);

  if (document.getElementById('noitem')) {
    document.getElementById('noitem').remove();
  }

}

function basicdelete(item) {

  localStorage.removeItem(item);

  if (document.getElementById('noitem')) {
    document.getElementById('noitem').remove();
  }

  if (document.getElementById(item)) {
    document.getElementById(item).remove();

  }  

}

//Redeem promo code

function redeem() {

  Swal.fire({
    title: 'Redeem a code',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {

      fetch("https://argenia.bob8552.repl.co/promo")

        .then(response => {

          response.text().then(function (text) {

            if (input === text) {

              if (localStorage.getItem("hasRedeemed")) return Swal.fire("You have already redeemed a code.");

              addpoints(500);
              localStorage.setItem('hasRedeemed', true)

              Swal.fire("You have redeemed 500 points!");

            }
            else if (input === "ZUCC") {

              Swal.fire("Definetly not an ultra secret code 😳");

            }
            else if (input === "DEVONMOBILE") {
              
              Swal.fire("Sure, here you go with your 2000 points -_-");
              
              addpoints(2000);
              
            }
            else {

              Swal.fire("Invalid code.");

            }


          });

        });

    }

  });

}

function setName() {

  Swal.fire({
    title: 'Set your username (less than 30 characters)',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {
      if (!input) return Swal.fire("Please input a name.");

			if (!(input.length >= 30)) {
				username = input;
				localStorage.setItem("username", username);
				Swal.fire("You now have a username!");
				document.getElementById("yourname").innerHTML = localStorage.getItem("username");
			} else {
				Swal.fire("Please input something less than 30 characters")
			}

    }

  });

}

function setAbout() {

  Swal.fire({
    title: 'Set your about text (less than 100 characters)',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {
      if (!input) return Swal.fire("Please input something");

			if (!(input.length >= 100)) {
				userabout = input;
				localStorage.setItem("userabout", userabout);
				Swal.fire("You now have an about text!");
				document.getElementById("userabout").innerHTML = localStorage.getItem("userabout");
			} else {

				Swal.fire("Please input something less than 100 characters")

			}

    }

  });

}

//Count digits
function countDigits(n) {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
}

function deleteAllCookies() { // Delete all cookies
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

// Resets ALL cookies and localstorage
function resetUser() {

	  Swal.fire({
    title: 'Reset page',
    text: "Are you sure you want to reset ALL your stats and user info?",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Reset'
  })

    .then((result) => {

      if (result.value) {

        Swal.fire('Resetting...');
        localStorage.clear();
				deleteAllCookies();
				location.reload();

      }
    })

}

function appendToOnlineMembers() {

	// Get date and time for user recents list
	let currentDate = new Date();
	let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

	let user = `<div class="card" style="width:30rem;"><div class="card-body"><img src="${localStorage.getItem("avatar")}" onError="this.onerror=null;this.src='/images/UnknownUser.png';" height="115" width="115" style="float:left;padding-right: 10px;"><h6><b>${username || "Unknown user"}</b></h6><h6>Points:${points}</h6><h6>About: ${userabout || "User has no about"}</h6><small>${time}</small></div></div><br>`

	function sendRequest() {
		$.get("https://argenia.bob8552.repl.co/onlinelistadd", {message:user}, function(data){
			console.log(data);
		});
	}
	sendRequest()

}

function getMembers() {
 
	function sendRequest() {
		$.get("https://argenia.bob8552.repl.co/onlinelist", function(data){
			var onlineusers = data
			document.getElementById("onlineusers").innerHTML = onlineusers
		});
	}
	sendRequest()

}

function updateuserlist() {
	getMembers()
}

appendToOnlineMembers(); // Upload to the server that a user has come online