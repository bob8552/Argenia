var selling_value = {

	frisbee: 10, // 15
	pan: 10, // 15
	car: 1500, // 2000
	van: 4500, // 4500
	garden: 450, // 500
	coupon: 40,
	coupon_n:"Coupon",

	frisbee_n: "Frisbee",
	pan_n: "Pan",
	car_n: "Car",
	van_n: "Van",
	garden_n: "Garden"

}

function sell(item) {

	if (!item) return console.log("Error with function sell()");
	if (!localStorage.getItem(item)) return Swal.fire("You do not own that item.");


	var item_text = item.toLowerCase()
	var toSell;

	// Dictate what we want to sell our item for, using the variables at the top.
	if (item == selling_value.frisbee_n) {

		toSell = selling_value.frisbee

	} else if (item == selling_value.pan_n) {

		toSell = selling_value.pan

	} else if (item == selling_value.car_n) {

		toSell = selling_value.car

	} else if (item == selling_value.van_n) {

		toSell = selling_value.van

	} else if (item == selling_value.garden_n) {

		toSell = selling_value.garden

	} else if (item == selling_value.coupon_n) {

		toSell = selling_value.coupon

	}


	Swal.fire({
		title: `Sell ${item_text} for ${toSell} points?`,
		text: "You won't be able to revert this!",
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sell'
	})
		.then((result) => {

			if (result.value) {
				Swal.fire({
					title: `You have sold this item for ${toSell} points.`,
					confirmButtonColor: '#3085d6',
					confirmButtonText: 'OK'
				})
					.then((result) => {

						if (result.value) {
							localStorage.removeItem(item);
							addpoints(toSell)
							location.reload()
						}

					})

			}

		})

}