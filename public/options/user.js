function setAvatar() {

  Swal.fire({
    title: "Set an avatar",
		text: "Input an image URL - Make sure your avatar is appropriate.",
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    confirmButtonText: 'Set',

    preConfirm: async (input) => {

			if (!input) return Swal.fire("Please input a valid image URL")

				localStorage.setItem("avatar", input);

    }

  });


}