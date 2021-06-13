//Business feature
console.log("Businesses module loaded");

// Create a local variable of the business level variable
var buslevellocal = 0;

// Create a business level variable if not available
if (localStorage.getItem('buslevel')) {

  buslevellocal = parseInt(localStorage.getItem('buslevel'), 10);

} else {

  localStorage.setItem('buslevel', buslevellocal);
		
}


// Set the user's business name
function businessname() {

		document.getElementById("showbus").removeAttribute("hidden");

	  if (localStorage.getItem('business')) {

    document.getElementById('smallbus').setAttribute('disabled', 'disabled');
    document.getElementById("busnamespace").innerHTML = `Business name - ${localStorage.getItem("businessname") || "Currently unnamed."}`;
    document.getElementById("busdescspace").innerHTML = `Business description - ${localStorage.getItem("businessdesc") || "No description."}`;

    document.getElementById('smallbus').innerHTML = "You own a business.";

  } else {

    document.getElementById("infobus").innerHTML = "";

  }

}

// Create a cookie, only used for timed purposes
function createCookie(cookieName, cookieValue) {

  //document.cookie = cookieName + "=" + cookieValue + "; expires=" + '2022-05-28T15:42:44.000Z';
  var expirationDate = new Date();
  var cookie_string = '';
  expirationDate.setHours(expirationDate.getHours() + 24);
  cookie_string = cookieName + "=" + cookieValue + "; path=/; SameSite=None; Secure; expires=" + expirationDate.toUTCString();
  document.cookie = cookie_string;

}

// Access a cookie
function accessCookie(cookieName) {

  var name = cookieName + "=";
  var allCookieArray = document.cookie.split(';');

  for (var i = 0; i < allCookieArray.length; i++) {

    var temp = allCookieArray[i].trim();
    if (temp.indexOf(name) == 0) return temp.substring(name.length, temp.length);

  }

  return "";

}

// User obtains a business
function buyBusiness(price, name, elementToDisable) {

  if (parseInt(points, 10) < price) return Swal.fire("You don't have enough money!");

  removepoints(price);

  Swal.fire("You now own a business.");

  localStorage.setItem(name, true);
  document.getElementById("busnamespace").innerHTML = "Business name - Currently unnamed.";
  document.getElementById("busdescspace").innerHTML = "Business description - No description.";

  document.getElementById("infobus").innerHTML = "Information";

  document.getElementById(elementToDisable).setAttribute('disabled', 'disabled');
  document.getElementById(elementToDisable).innerHTML = "You own a business.";

}

// User upgrades a business
function upgradeBusiness() {

  if (parseInt(points, 10) < 50) return Swal.fire("You don't have enough money!");
  if (!localStorage.getItem("business")) return Swal.fire("You don't own a business.");
  removepoints(50);

  buslevellocal++;
  localStorage.setItem("buslevel", buslevellocal);
  Swal.fire(`Your business is now at level ${buslevellocal}!`);

}

function payEmployee() {
  if (!localStorage.getItem("business")) return Swal.fire("You don't own a business.");
  if (accessCookie("hasEmployeePay") != "") return Swal.fire("You have already paid your employees.");

  buslevellocal = localStorage.getItem("buslevel");
  const cost = parseInt(buslevellocal, 10) * 3 + 2;

  if (parseInt(points, 10) < cost) return Swal.fire("You dont have enough money to pay your employees.");

  removepoints(cost)
  createCookie("hasEmployeePay", true);

  Swal.fire(`You paid your employees ${cost} argens!`)

}

function claimpoints() {

  if (!localStorage.getItem("business")) return Swal.fire("You don't own a business.");
  if (!accessCookie("hasEmployeePay")) return Swal.fire("First pay your employees. You must pay them every 24 hours.");
  if (accessCookie("hasClaimed") != "") return Swal.fire("You already claimed Points in the last 24 hours.");

  createCookie("hasClaimed", true);

  buslevellocal = localStorage.getItem("buslevel");
  const pay = parseInt(buslevellocal, 10) * 5 + 5;

  addpoints(pay);
  Swal.fire(`You got ${pay} argens!`);

}

function namebus() {

  if (!localStorage.getItem("business")) return Swal.fire("You don't own a business.");

  Swal.fire({
    title: 'Name your business',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {

      if (!input) return Swal.fire("Please enter a name.");

      localStorage.setItem("businessname", input);

      document.getElementById("busnamespace").innerHTML = `Business name - ${localStorage.getItem("businessname")}`;

    }
  });

}

// Add a description to the user's business.
function descbus() {

  if (!localStorage.getItem("business")) return Swal.fire("You don't own a business.");

  Swal.fire({
    title: 'Describe your business',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {

      if (!input) return Swal.fire("Please enter a description.");

      localStorage.setItem("businessdesc", input);

      document.getElementById("busdescspace").innerHTML = `Business description - ${localStorage.getItem("businessdesc")}`;

    }
  });

}

// Function to delete the user's business, remove it from the localStorage and remove information from the page.
function delbus() {

  if (!localStorage.getItem("business")) return Swal.fire("You don't own a business.");

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete business'
  })

  .then((result) => {

      if (result.value) {

        
        Swal.fire("Your business has been deleted.");

				// Remove localstorage items
        localStorage.removeItem("business");
        if (localStorage.getItem("businessname")) localStorage.removeItem("businessname");
        if (localStorage.getItem("businessdesc")) localStorage.removeItem("businessdesc");
      
        //Change elements
        document.getElementById("infobus").innerHTML = "";
        document.getElementById('smallbus').removeAttribute('disabled');
        document.getElementById("busnamespace").innerHTML = ``;
        document.getElementById("busdescspace").innerHTML = ``;
        document.getElementById('smallbus').innerHTML = "Buy a business";

      }
  })

}