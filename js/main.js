window.onload = function () {

  var input_field = document.getElementById("user_input");

  input_field.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
       event.preventDefault();
      document.getElementById("submit_button").click();
    }
  });
};
