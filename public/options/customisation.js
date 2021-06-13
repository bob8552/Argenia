// Functions for user customisation of the page.
console.log("Customisation Module Loaded")

// Apply theme to the page when loaded.
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

// Change the background of the page and save it to localStorage
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

// Change the foreground of the page and save it to localStorage
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

// Change the button colour and save it
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

// Resets the user's button, background and foreground modifications.
function backgroundremove() {
  // Alert user of changes
  Swal.fire("Your background & foreground colour has been reset.").then(() => {
    
    // Reset background
    document.body.style.background = '#adadad';
    // Reset foreground
    document.getElementById("container").style.background = 'white';
    document.getElementById("container").style.borderColor = 'white';
    // Reset the localStorage values
    if (localStorage.getItem("background")) localStorage.removeItem("background");
    if (localStorage.getItem("foreground")) localStorage.removeItem("foreground");
    if (localStorage.getItem("button")) localStorage.removeItem("button");
    // Reload the pages so changes take effect
    location.reload();
    
  });
}