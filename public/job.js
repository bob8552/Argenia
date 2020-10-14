function addJob(name, req) {

	if (accessCookie("qj")) return Swal.fire("Please wait 24 hours before you can apply for a job.");
	if (localStorage.getItem("Job")) return Swal.fire("You already have a job.");
	if (exp < req) return Swal.fire("You do not have enough EXP to apply.");
	document.getElementById("jb").innerHTML = name;

	localStorage.setItem("Job", name);
	Swal.fire("You now have a job!");

}

function quitJob() {

	if (!localStorage.getItem("Job")) return Swal.fire("You dont have a job!");

	localStorage.removeItem("Job");
	createCookie("qj", "TRUE");
	Swal.fire("You have quit your job. You now must wait 24 hours before you can find another job.");
	document.getElementById("jb").innerHTML = "You don't have a job.";

}

function doJob() {
if (!localStorage.getItem("Job")) return Swal.fire("You dont have a job!");
if (accessCookie("jd")) return Swal.fire("Please wait 24 hours before you can work again.");

	//From now on we refer to "localStorage.getItem("Job")" as simply "Job"
	var Job = localStorage.getItem("Job");

	if (Job === "Chef") {

		const scrambled = ["kooc", "doof", "nap", "stop", "rettub", "daerb", "sag", "yrruc"];
		const unscrambled = ["cook", "food", "pan", "pots", "butter", "bread", "gas", "curry"];

		var randomNumber = Math.floor(Math.random() * 8);
		//please update index
		var random = scrambled[randomNumber];
		var solution = unscrambled[randomNumber];

		Swal.fire({
			title: "Unreverse words - Work as a chef",
			text: random,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			confirmButtonText: 'Check answer',

			preConfirm: async (input) => {

				if (input.toLowerCase() === solution) {

					addpoints(25);
					exp = exp + 10;
					localStorage.setItem("exp", exp);

					Swal.fire("Well done, you have been paid 25 Argens. +10 EXP");
					createCookie("jd", "TRUE");


				} else {

					Swal.fire("Terrible effort, you failed. Try again in 24 hours.");
					createCookie("jd", "TRUE");

				}

			}

		});

	} else if (Job === "Waiter") {

		const scrambled = ["evres", "doof", "etalp", "stop", "remotsuc", "daerb", "tnialpmoc", "yrruc"];
		const unscrambled = ["serve", "food", "plate", "pots", "customer", "bread", "complaint", "curry"];

		var randomNumber = Math.floor(Math.random() * 8);
		//please update index
		var random = scrambled[randomNumber];
		var solution = unscrambled[randomNumber];

		Swal.fire({
			title: "Unreverse words - Work as a waiter",
			text: random,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			confirmButtonText: 'Check answer',

			preConfirm: async (input) => {

				if (input.toLowerCase() === solution) {

					addpoints(30);
					exp = exp + 10;
					localStorage.setItem("exp", exp);

					Swal.fire("Well done, you have been paid 30 Argens. +10 EXP");
					createCookie("jd", "TRUE");


				} else {

					Swal.fire("Terrible effort, you failed. Try again in 24 hours.");
					createCookie("jd", "TRUE");

				}

			}

		});

	}


}