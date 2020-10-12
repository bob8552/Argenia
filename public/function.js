console.log("Functions loaded");

//Back to top button
let backtotopbutton = document.getElementById("backtotop");

window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backtotopbutton.style.display = "block";
  } else {
    backtotopbutton.style.display = "none";
  }
}

//To top
function toTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Functions and stuff
//Change background
window.addEventListener('load', () => {
  if (localStorage.getItem("background")) document.body.style.background = localStorage.getItem("background");
  if (localStorage.getItem("foreground")) {
    document.getElementById("container").style.background = localStorage.getItem("foreground");
    document.getElementById("container").style.borderColor = localStorage.getItem("foreground");
  };
  if (localStorage.getItem("button")) {    
    
    var style = document.createElement('style');
    style.innerHTML =
      'button {' +
        `background-color: ${localStorage.getItem("button")} !important;` +
      '}';
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);
    
  }
});

//Background
function hexBG() {

  Swal.fire({
    title: 'Choose a background colour',
    text: 'Please use a hex colour code.',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {

      document.body.style.background = input;

      localStorage.setItem("background", input);
      Swal.fire("Your background colour has been changed! You can reset it at any time.");

    }

  });

}

//Foreground
function hexFG() {

  Swal.fire({
    title: 'Choose a foreground colour',
    text: 'Please use a hex colour code.',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {

      document.getElementById("container").style.background = input;
      document.getElementById("container").style.borderColor = input;

      localStorage.setItem("foreground", input);
      Swal.fire("Your foreground colour has been changed! You can reset it at any time.");

    }

  });

}

//Button
function hexB() {
  
Swal.fire({
  title: 'Choose a button colour',
  text: 'Please use a hex colour code.',
  input: 'text', 
  inputAttributes: {
    autocapitalize: 'off'
    },
  confirmButtonText: 'Submit',
  
  preConfirm: async (input) => {
    
    localStorage.setItem("button", input);
    
    var style = document.createElement('style');
    style.innerHTML =
      'button {' +
        `background-color: ${localStorage.getItem("button")} !important;` +
      '}';
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style, ref);
    
    Swal.fire("Your button colour has been successfully changed!");
              
  }
}); 
  
}  
              
  
  
          
function backgroundremove() {
  
  //Alert user
  Swal.fire("Your background & foreground colour has been reset.").then(() => {
    
    //Default background
    document.body.style.background = '#adadad';
    //Default foreground
    document.getElementById("container").style.background = 'white';
    document.getElementById("container").style.borderColor = 'white';
    //Remove variables
    if (localStorage.getItem("background")) localStorage.removeItem("background");
    if (localStorage.getItem("foreground")) localStorage.removeItem("foreground");
    if (localStorage.getItem("button")) localStorage.removeItem("button");
    //Reload for buttons
    location.reload();
    
  });
  
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

//Clear EXP
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

              addpoints(100);
              localStorage.setItem('hasRedeemed', true)

              Swal.fire("You have redeemed 100 argens!");

            }
            else if (input === "ZUCC") {

              Swal.fire("Definetly not an ultra secret code 😳");

            }
            else if (input === "DEVONMOBILE") {
              
              Swal.fire("Sure, here ya go with your 2000 bucks -_-");
              
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
    title: 'Set your username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Submit',

    preConfirm: async (input) => {
      if (!input) return Swal.fire("Please input a name.");

			username = input;
      localStorage.setItem("username", username);
      Swal.fire("You now have a username!");
      document.getElementById("yourname").innerHTML = localStorage.getItem("username");

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
//End!