// Games & Activities
console.log("Games module loaded");
//localStorage.removeItem('Apple');

//Random events
function fireEvent() {

  if (points < 100) return;
  const random = Math.floor(Math.random() * 8);

  if (localStorage.getItem("hasInvested") && !accessCookie("hasInvestedC")) {
    const randomI = Math.floor(Math.random() * 2) + 1;

    switch (randomI) {

      case 1:
        Swal.fire(`You have gotten ${parseInt(localStorage.getItem("hasInvested"), 10) + 25} argens from your previous investment!`);
        addpoints(parseInt(localStorage.getItem("hasInvested"), 10) + 25);
        localStorage.removeItem("hasInvested");
        break;

      case 2:
        Swal.fire(`From your previous investment - The company went bankrupt and they didn't repay you.`);
        localStorage.removeItem("hasInvested");
        break;

      default:
        Swal.fire("Error");

    }

  } else {

    if (random === 1) { //Unreverse word

      unreverse("Random Event - Unreverse words");

    } else if (random === 2 && !accessCookie("hasEmployeePay") && localStorage.getItem("business")) { //Pay employees

      Swal.fire("[YOUR BUSINESS]- You have not payed your employees, so 50 argens have been fined from you to pay your employees. Remember to pay your employees every day!")
      if (parseInt(points, 10) > 50) removepoints(50);
      createCookie("hasEmployeePay", true);

    } else if (random === 3 && !accessCookie("hasInvestedC") && !localStorage.getItem("hasInvested")) { //Investment

      var RandomInvestpoints = Math.floor(Math.random() * 300) + 200;

      Swal.fire({
        title: "Random Event - Investment",
        text: `You have been given the opportunity to invest ${RandomInvestpoints} argens in a company. Invest or decline?`,
        showCancelButton: true,
        cancelButtonText: "Decline",
        confirmButtonText: "Invest",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#3085d6',
        reverseButtons: true
      }).then(result => {
        if (result.value) { //Accepts investment

          //If not enough points
          if (parseInt(points, 10) < RandomInvestpoints) return Swal.fire("You don't have enough argens.");

          Swal.fire("You have accepted. Please wait 24 hours for the result.");
          removepoints(RandomInvestpoints);

          //Make the storage items
          localStorage.setItem("hasInvested", RandomInvestpoints);
          createCookie("hasInvestedC", true);

        }
        else if (result.dismiss === Swal.DismissReason.cancel) { //Cancels investment

          Swal.fire("You declined the investment.");

        }
      });

    }

  }

}



window.addEventListener('load', () => {

  fireEvent();

});

//Sell fruits
function sell(food, infname) {

  if (!localStorage.getItem(food)) return Swal.fire(`You do not own any ${infname}.`);
  basicdelete(food);
  Swal.fire(`You have sold your ${infname} for 20 argens!`);
  addpoints(20);

}

//Games
//Fruit or vegetable?
function foodGame() {

  const foods = [
    "carrot",
    "lettuce",
    "tomato",
    "apple",
    "banana",
    "peach",
    "plum",
    "asparagus",
    "parsnip",
    "gourd",
    "apricot",
    "pineapple",
    "melon",
    "lemon",
    "cabbage",
    "broccoli",
    "orange",
    "pear",
    "mango",
    "durian",
    "jabuticaba",
    "rambutan",
    "tamarind",
    "dulse",
    "persimmon",
    "prune",
    "kiwi",
    "kale",
    "sprouts",
    "peas",
    "beans"
  ];

  const foodtypes = [
    "vegetable",
    "vegetable",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "vegetable",
    "vegetable",
    "vegetable",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "vegetable",
    "vegetable",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "fruit",
    "vegetable",
    "fruit",
    "fruit",
    "fruit",
    "vegetable",
    "vegetable",
    "vegetable",
    "fruit"
  ];

  //wip not finished
  //Math.floor(Math.random() * 31 <-- Index);
  //ALWAYS update the index!!!!!

  var randomNumber = Math.floor(Math.random() * 31 /*<-- Index, number of entries in the table*/);
  var random = foods[randomNumber];
  var solution = foodtypes[randomNumber];

  Swal.fire({
    title: "Fruit or vegetable?",
    text: random,
    showCancelButton: true,
    cancelButtonText: "Vegetable",
    confirmButtonText: "Fruit",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#3085d6',
    reverseButtons: true
  }).then(result => {
    if (result.value) {
      if (solution === "fruit") {

        Swal.fire("You got it correct, you get 5 argens!");
        addpoints(5);

      } else {
        Swal.fire("You got it wrong, try again!");
      }
    }
    else if (result.dismiss === Swal.DismissReason.cancel) {
      if (solution === "vegetable") {

        Swal.fire("You got it correct, you get 5 argens!");
        addpoints(5);

      } else {
        Swal.fire("You got it wrong, try again!");
      }
    }
  });
}

//Riddles
function riddleGame() {

  const riddle = [
    "What is shaped like a box, has no feet, and runs up and down?",
    "When do astronauts eat their sandwiches?",
    "Why was the chicken forbidden from sending e-mails?",
    "What bird is always out of breath?",
    "Why did the tire need a vacation?",
    "How does the moon cut it's hair?",
    "What weighs more - A pound of feathers or a pound of stones?",
    "Before Mount Everest was discovered, what was the highest mountain on Earth?",
    "What lies at the bottom of the sea and shivers?",
    "Why aren't elephants allowed on the beach?"
  ];

  const answer = [
    "elevator",
    "launch",
    "fowl language",
    "puffin",
    "pressure",
    "eclipse",
    "both",
    "mount everest",
    "nervous wreck",
    "trunks up"
  ];

  var randomNumber = Math.floor(Math.random() * 10);
  var random = riddle[randomNumber];
  var solution = answer[randomNumber];

  Swal.fire({
    title: "Answer the riddle",
    text: random,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Check answer',

    preConfirm: async (input) => {

      if (input.toLowerCase().includes(solution)) {

        addpoints(15);
        Swal.fire("Correct! You get 15 argens");

      } else {

        Swal.fire(`You got it wrong, try again!\n Answer: ${solution}`);

      }

    }

  });

}

//Reptile or mammal?

function animalGame() {

  const animals = [
    "dog",
    "cat",
    "whale",
    "seal",
    "snake",
    "alligator",
    "crocodile",
    "gecko",
    "Komodo dragon",
    "turtle",
    "tortoise"
  ];

  const animType = [
    "mammal",
    "mammal",
    "mammal",
    "mammal",
    "reptile",
    "reptile",
    "reptile",
    "reptile",
    "reptile",
    "reptile",
    "reptile",
  ];

  //Why was the index 1..
  var randomNumber = Math.floor(Math.random() * 11);
  var random = animals[randomNumber];
  var solution = animType[randomNumber];

  Swal.fire({
    title: "Reptile or mammal?",
    text: random,
    showCancelButton: true,
    cancelButtonText: "Reptile",
    confirmButtonText: "Mammal",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#3085d6',
    reverseButtons: true
  }).then(result => {
    if (result.value) {
      if (solution === "mammal") {

        Swal.fire("You got it correct, you get 5 argens!");
        addpoints(5);

      } else {
        Swal.fire("You got it wrong, try again!");
      }
    }
    else if (result.dismiss === Swal.DismissReason.cancel) {
      if (solution === "reptile") {

        Swal.fire("You got it correct, you get 5 argens!");
        addpoints(5);

      } else {
        Swal.fire("You got it wrong, try again!");
      }
    }
  });
}

//Cook - Identical aspects to taxi()

function cook() {
  if (!localStorage.getItem("Pan") && !localStorage.getItem("WorkPack")) return Swal.fire("You need a pan to cook food.");

  var random = Math.floor(Math.random() * 13) + 2;
  var randomIndex;

  exp++;
  localStorage.setItem("exp", exp);

  if (parseInt(exp, 10) >= 0 && parseInt(exp, 10) <= 10) {
    randomIndex = Math.floor(Math.random() * 4);
  }
  else if (parseInt(exp, 10) >= 10 && parseInt(exp, 10) <= 30) {
    randomIndex = Math.floor(Math.random() * 6);
  }
  else if (parseInt(exp, 10) >= 30) {
    randomIndex = Math.floor(Math.random() * 8);
  }

  if (randomIndex === 1) {
    Swal.fire("Ouch! You burnt yourself and you couldn't make the food.");
  }
  else if (randomIndex === 2) {
    Swal.fire("The people hated your food and left.");
  }
  else {

    addpoints(random);
    Swal.fire(`The people liked your food and paid you ${random} argens`);

  }

  document.getElementById("makefood").setAttribute("disabled", "disabled");
  document.getElementById("makefood").innerHTML = "Please wait 15 seconds.";

  setTimeout(() => {
    document.getElementById("makefood").removeAttribute("disabled");
    document.getElementById("makefood").innerHTML = "Get points by making food!";
  }, 15000);
}

//Frisbee game
function frisb() {
  if (!localStorage.getItem("Frisbee")) return Swal.fire("You need a frisbee first, obviously.");

  var random = Math.floor(Math.random() * 13) + 2;
  var randomIndex;

  exp = exp + 1;
  localStorage.setItem("exp", exp);

  if (parseInt(exp, 10) >= 0 && parseInt(exp, 10) <= 10) {
    randomIndex = Math.floor(Math.random() * 4);
  }
  else if (parseInt(exp, 10) >= 10 && parseInt(exp, 10) <= 30) {
    randomIndex = Math.floor(Math.random() * 6);
  }
  else if (parseInt(exp, 10) >= 30) {
    randomIndex = Math.floor(Math.random() * 8);
  }

  if (randomIndex === 1) {
    Swal.fire("You missed. +1 EXP");
  }
  else if (randomIndex === 2) {
    Swal.fire("You hit the target! +4 EXP");
		exp = exp + 4;
  	localStorage.setItem("exp", exp);
  }

  document.getElementById("frisbeeg").setAttribute("disabled", "disabled");
  document.getElementById("frisbeeg").innerHTML = "Please wait 15 seconds.";

  setTimeout(() => {
    document.getElementById("frisbeeg").removeAttribute("disabled");
    document.getElementById("frisbeeg").innerHTML = "Play with your frisbee!";
  }, 15000);
}

//Taxi game

function taxi() {
  if (!localStorage.getItem("Car") && !localStorage.getItem("WorkPack")) return Swal.fire("You need a car first.");

  var random = Math.floor(Math.random() * 13) + 2;
  var randomIndex;
  var randomFine = Math.floor(Math.random() * 3) + 1;

  exp++;
  localStorage.setItem("exp", exp);

  if (parseInt(exp, 10) >= 0 && parseInt(exp, 10) <= 30) {
    randomIndex = Math.floor(Math.random() * 4);
  }
  else if (parseInt(exp, 10) >= 30 && parseInt(exp, 10) <= 90) {
    randomIndex = Math.floor(Math.random() * 6);
  }
  else if (parseInt(exp, 10) >= 90) {
    randomIndex = Math.floor(Math.random() * 8);
  }

  if (randomIndex === 1) { //bumpy ride

    Swal.fire("The people did not like the bumpy ride.");

  } else if (randomIndex === 2) { //If fined

    //if user has no points at all.

    if (points > 5) {//has points, fine normally

      removepoints(randomFine);

    } else { //no points

      clearpoints();

    }

    Swal.fire(`You got pulled over by the police for speeding and you were fined ${randomFine} argens.`);

  }
  else { //success

    addpoints(random);
    Swal.fire(`You were paid ${random} points`);

  }

  document.getElementById("taxirides").setAttribute("disabled", "disabled");
  document.getElementById("taxirides").innerHTML = "Please wait 15 seconds.";

  setTimeout(() => {
    document.getElementById("taxirides").removeAttribute("disabled");
    document.getElementById("taxirides").innerHTML = "Get points by driving a taxi!";
  }, 15000);

}

//Unreverse word game

function unreverse(titleAlert = 'Unreverse words') {

  const scrambled = ["noisnam", "sdrawkcab", "nepir", "emusnoc", "raelcun", "eldnah", "klim", "elppa", "ananab", "mulp", "llew", "yppah", "das", "dlo", "drah", "gnizama"];
  const unscrambled = ["mansion", "backwards", "ripen", "consume", "nuclear", "handle", "milk", "apple", "banana", "plum", "well", "happy", "sad", "old", "hard", "amazing"];

  var randomNumber = Math.floor(Math.random() * 16);
  //please update index
  var random = scrambled[randomNumber];
  var solution = unscrambled[randomNumber];

  Swal.fire({
    title: titleAlert,
    text: random,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Check answer',

    preConfirm: async (input) => {

      if (input.toLowerCase() === solution) {

        addpoints(10);

        Swal.fire("Correct! You get 10 argens");

      } else {

        Swal.fire("You got it wrong, try again!");

      }

    }

  });

}

//Hard version of unreverse words

function unreverseHARD() {

  const scrambled = ["yllaretil", "detalumits", "sseldragerri", "decudni", "tehcas", "noitcefni", "noruen", "citatsortcele", "citengamortcele", "evisolpmi", "erahswolp", "citamelborp"];
  const unscrambled = ["literally", "stimulated", "irregardless", "induced", "sachet", "infection", "neuron", "electrostatic", "electromagnetic", "implosive", "plowshare", "problematic"];

  var randomNumber = Math.floor(Math.random() * 12);

  var random = scrambled[randomNumber];
  var solution = unscrambled[randomNumber];

  Swal.fire({
    title: 'Unreverse words',
    text: random,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Check answer',

    preConfirm: async (input) => {

      if (input.toLowerCase() === solution) {

        addpoints(15);

        Swal.fire("Correct! You get 15 argens");

      } else {

        Swal.fire("You got it wrong, try again!");

      }

    }

  });

}

//Plants game

function growplants() {
  if (!localStorage.getItem("Garden") && !localStorage.getItem("WorkPack")) return Swal.fire("You need a garden first.");

  var random = Math.floor(Math.random() * 13) + 2;
  var randomIndex;

  exp++;
  localStorage.setItem("exp", exp);

  if (parseInt(exp, 10) >= 0 && parseInt(exp, 10) <= 20) {
    randomIndex = Math.floor(Math.random() * 4);
  }
  else if (parseInt(exp, 10) >= 20 && parseInt(exp, 10) <= 50) {
    randomIndex = Math.floor(Math.random() * 6);
  }
  else if (parseInt(exp, 10) >= 50) {
    randomIndex = Math.floor(Math.random() * 8);
  }

  if (randomIndex === 1) { //Fail

    Swal.fire("Your plants died.");

  }
  else {

    //Success message
    let success = `Your plants thrived and you sold them for ${random} argens.`;
    //Index
    const random2 = Math.floor(Math.random() * 3);

    if (random2 === 2) {

      success = `Your plants thrived and you sold them for ${random} argens. You also kept some cucumbers for yourself.`;
      basicbuy("Cucumbers");

    }

    addpoints(random);
    Swal.fire(success);

  }

  document.getElementById("garden").setAttribute("disabled", "disabled");
  document.getElementById("garden").innerHTML = "Please wait 15 seconds.";

  setTimeout(() => {
    document.getElementById("garden").removeAttribute("disabled");
    document.getElementById("garden").innerHTML = "Get argens by growing plants!";
  }, 15000);

}
//Harvest apples

function harvestapples() {
  if (!localStorage.getItem("AppleTree") && !localStorage.getItem("WorkPack")) return Swal.fire("You need an apple tree first.");

  //If already harvested apples.
  if (accessCookie("hasHarvestedApples")) return Swal.fire("Your apples aren't ripe yet. Check back later!");
  createCookie("hasHarvestedApples", true);

  var random = Math.floor(Math.random() * 13) + 2;
  var randomIndex;

  exp++;
  localStorage.setItem("exp", exp);

  if (parseInt(exp, 10) >= 0 && parseInt(exp, 10) <= 20) {
    randomIndex = Math.floor(Math.random() * 4);
  }
  else if (parseInt(exp, 10) >= 20 && parseInt(exp, 10) <= 50) {
    randomIndex = Math.floor(Math.random() * 6);
  }
  else if (parseInt(exp, 10) >= 50) {
    randomIndex = Math.floor(Math.random() * 8);
  }

  if (randomIndex === 1) { //Fail

    Swal.fire("All the apples were spoilt by pests.");

  }
  else { //Success

    //Success message
    let success = `You sold your apples for ${random} argens.`;
    //Index
    const random2 = Math.floor(Math.random() * 3);

    if (random2 === 2) {

      success = `You sold your apples for ${random} argens and you kept some apples for yourself.`;
      basicbuy("Apples");

    }

    //Add points
    addpoints(random);
    Swal.fire(success);

  }

  document.getElementById("apples").setAttribute("disabled", "disabled");
  document.getElementById("apples").innerHTML = "Please wait 15 seconds.";

  setTimeout(() => {
    document.getElementById("apples").removeAttribute("disabled");
    document.getElementById("apples").innerHTML = "Get points by harvesting apples!";
  }, 15000);

}

//Delivery game

function delivery() {
  if (!localStorage.getItem("Van") && !localStorage.getItem("WorkPack")) return Swal.fire("You need a van first.");

  var random = Math.floor(Math.random() * 13) + 2; //Amount of points gained
  var randomIndex; //Chance of succeeding
  var randomFine = Math.floor(Math.random() * 7) + 1; //Random fine

  exp++;
  localStorage.setItem("exp", exp);

  //Calculating chance of succeeding
  if (parseInt(exp, 10) >= 0 && parseInt(exp, 10) <= 30) {
    randomIndex = Math.floor(Math.random() * 4);
  }
  else if (parseInt(exp, 10) >= 30 && parseInt(exp, 10) <= 90) {
    randomIndex = Math.floor(Math.random() * 6);
  }
  else if (parseInt(exp, 10) >= 90) {
    randomIndex = Math.floor(Math.random() * 8);
  }

  //Depends on index, choose the user's fate ;)
  if (randomIndex === 1) { //Too late

    Swal.fire("You did not reach your desination on time.");

  } else if (randomIndex === 2) { //If fined

    //if user has some points, do this

    if (points > 9) {

      removepoints(randomFine);

    } else { //else, remove all points

      clearpoints();

    }

    Swal.fire(`You got pulled over by the police for wreckless driving and you were fined ${randomFine} argens.`);

  }
  else { //success

    addpoints(random);
    Swal.fire(`You did your delivery and you were paid ${random} argens`);

  }

  document.getElementById("deliverpackages").setAttribute("disabled", "disabled");
  document.getElementById("deliverpackages").innerHTML = "Please wait 15 seconds.";

  setTimeout(() => {
    document.getElementById("deliverpackages").removeAttribute("disabled");
    document.getElementById("deliverpackages").innerHTML = "Get argens by delivering packages!";
  }, 15000);

}