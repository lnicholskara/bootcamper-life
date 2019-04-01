$(document).ready(function() {
  // Get references to page elements
  var displayFullName = $("#username");
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
    displayFullName.text(data[0].first_name + " " + data[0].last_name);
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

  // Avatar
  function displayAvatar() {
    $.get("/api/myuser", function(data) {
      console.log("Current User Profile: ", data);
      // eslint-disable-next-line no-unused-vars
      var fullName = data[0].first_name + " " + data[0].last_name;

      var colours = [
        "#425db2",
        "#b172e2",
        "#12a6e9",
        "#faa534",
        "#823bd5",
        "#1a2261",
        "#831B4E",
        "#A13669",
        "#3B506F",
        "#7A5365",
        "#A7565F",
        "#DD6157",
        "#FA7F52",
        "#002372",
        "#EA2345",
        "#44C6E2",
        "#12AFD3",
        "#8832D2",
        "#D432B5"
      ];

      var name = fullName,
        nameSplit = name.split(" "),
        initials =
          nameSplit[0].charAt(0).toUpperCase() +
          nameSplit[1].charAt(0).toUpperCase();

      var charIndex = initials.charCodeAt(0) - 65,
        colourIndex = charIndex % 19;

      var canvas = document.getElementById("user-icon");
      var context = canvas.getContext("2d");

      var canvasWidth = $(canvas).attr("width"),
        canvasHeight = $(canvas).attr("height"),
        canvasCssWidth = canvasWidth,
        canvasCssHeight = canvasHeight;

      if (window.devicePixelRatio) {
        $(canvas).attr("width", canvasWidth * window.devicePixelRatio);
        $(canvas).attr("height", canvasHeight * window.devicePixelRatio);
        $(canvas).css("width", canvasCssWidth);
        $(canvas).css("height", canvasCssHeight);
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      context.fillStyle = colours[colourIndex];
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = "20px Arial";
      context.textAlign = "center";
      context.fillStyle = "#FFF";
      context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.5);
    });
  }

  displayAvatar();
});
