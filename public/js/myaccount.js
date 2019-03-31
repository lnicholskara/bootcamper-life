$(document).ready(function() {
  // Get references to page elements
  var displayFirstName = $("#firstname");
  var displayLastName = $("#lastname");
  var displayEmail = $("#email");
  var displayCampus = $("#userSchool");
  var displayCity = $("#city");
  var displayState = $("#state");
  var displayGitHub = $("#github_link");
  var saveButton = $("#save");

  getUserInfo();

  $(saveButton).on("click", saveProfile);

  function getUserInfo() {
    $.get("/api/myuser", function(data) {
      console.log("Current User Profile: ", data);

      displayUserInfo(data);
    });
  }

  function displayUserInfo(data) {
    displayFirstName.val(data[0].first_name);
    displayLastName.val(data[0].last_name);
    displayEmail.val(data[0].email);
    displayCampus.val(data[0].school);
    displayCity.val(data[0].city);
    displayState.val(data[0].state);
    displayGitHub.val(data[0].github_link);
  }

  // A function for handling what happens when the form to create a new post is submitted
  function saveProfile(event) {
    event.preventDefault();
    // Constructing a newPost object to hand to the database
    var newInfo = {
      first_name: displayFirstName.val().trim(),
      last_name: displayLastName.val().trim(),
      email: displayEmail.val().trim(),
      school: displayCampus.val().trim(),
      city: displayCity.val().trim(),
      state: displayState.val().trim(),
      github_link: displayGitHub.val().trim()
    };
    console.log(newInfo);
    updateUser(newInfo);
  }

  // Update a given post, bring user to the blog page when done
  function updateUser(data) {
    $.ajax({
      method: "PUT",
      url: "/api/myuser",
      data: data
    }).then(function() {
      window.location.reload();
    });
  }
});
