console.log("Job module loaded")

function addJob(name, req) {

	if (accessCookie("qj")) return Swal.fire("Please wait 24 hours before you can apply for a job.");
	if (localStorage.getItem("Job")) return Swal.fire("You already have a job.");
	if (exp < req) return Swal.fire("You do not have enough EXP to apply - Try doing some activities to gain EXP.");
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

					addpoints(50);
					exp = exp + 10;
					localStorage.setItem("exp", exp);

					Swal.fire("Well done, you have been paid 50 Points. +10 EXP");
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

	} else if (Job === "Scientist") {

		const questions = [
		"What is the powerhouse of the cell?",
		"What is the heaviest organ in the body?",
		"What is the only planet that spins clockwise?",
		"What is the fastest growing plant species?",
	  "What is the only planet spins clockwise?",
		"What is the event called when the moon appears to block the sun from earth?",
		"What trees never lose their leaves?",
		"What is the only rock that floats?"
		];
		const answers = [
		"mitochondria",
		"liver",
		"venus",
		"bamboo",
		"venus",
		"solar eclipse",
		"evergreen",
		"pumice"
		];

		var randomNumber = Math.floor(Math.random() * 8);
		//please update index
		var question = questions[randomNumber];
		var answer = answers[randomNumber];

		Swal.fire({
			title: "Trivia - Work as a Scientist - 2 tries",
			text: question,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			confirmButtonText: 'Check answer',

			preConfirm: async (input) => {

				if (input.toLowerCase().includes(answer)) {

					addpoints(80);
					exp = exp + 15;
					localStorage.setItem("exp", exp);

					Swal.fire("Well done, you have been paid 80 points. +15 EXP");
					createCookie("jd", "TRUE");


				} else {

					Swal.fire({
						title: "Incorrect Answer - 1 try left",
						text: question,
						input: 'text',
						inputAttributes: {
							autocapitalize: 'off'
						},
						confirmButtonText: 'Check answer',

						preConfirm: async (input) => {

							if (input.toLowerCase().includes(answer)) {

								addpoints(80);
								exp = exp + 15;
								localStorage.setItem("exp", exp);

								Swal.fire("Well done, you have been paid 80 points. +15 EXP");
								createCookie("jd", "TRUE");


							} else {

								Swal.fire("Terrible effort, you failed. Try again in 24 hours.");
								createCookie("jd", "TRUE");

							}

						}

		});

				}

			}

		});

	}


}