// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  // **************** FOR LOOP FOR USERS PROFILES NETWORK  ******************

  var profiles;

  $.get("/api/users/", function(data) {
    console.log("Profiles", data);
    profiles = data;
    for (var i = 0; i < profiles.length; i++) {
      console.log(
        "the current profiles are: ",
        profiles[i].first_name + profiles[i].last_name
      );
      var profileInfo = {
        firstName: profiles[i].first_name,
        lastName: profiles[i].last_name,
        school: profiles[i].school,
        graduated: profiles[i].graduated_yet,
        city: profiles[i].city,
        state: profiles[i].state,
        github: profiles[i].github_link
      };

      // var newRow = $("<tr>");
      // var oneProfile = $("<td>");
      // oneProfile.html(
      //   "<th scope='row'>" +
      //     profileInfo.firstName +
      //     "</th>" +
      //     "<th scope='row'>" +
      //     profileInfo.lastName +
      //     "</th>"
      // );
      // newRow.append(oneProfile);
      // $("tbody").append(newRow);

      var profileRow = $("#all-profiles");
      var singleProfile = $("<tr>").append(
        $("<td>").text(profileInfo.firstName),
        $("<td>").text(profileInfo.lastName),
        $("<td>").text(profileInfo.school),
        $("<td>").text(profileInfo.city),
        $("<td>").text(profileInfo.state),
        $("<td>").text(profileInfo.graduated),
        $("<td>").text(profileInfo.github)
      );
      $(profileRow).append(singleProfile);
    }
  });

  // ************** AVATAR CODE ***************
  // var colours = [
  //   "#1abc9c",
  //   "#2ecc71",
  //   "#3498db",
  //   "#9b59b6",
  //   "#34495e",
  //   "#16a085",
  //   "#27ae60",
  //   "#2980b9",
  //   "#8e44ad",
  //   "#2c3e50",
  //   "#f1c40f",
  //   "#e67e22",
  //   "#e74c3c",
  //   "#95a5a6",
  //   "#f39c12",
  //   "#d35400",
  //   "#c0392b",
  //   "#bdc3c7",
  //   "#7f8c8d"
  // ];

  // var name = "Lee Crossley",
  //   nameSplit = name.split(" "),
  //   initials =
  //     nameSplit[0].charAt(0).toUpperCase() +
  //     nameSplit[1].charAt(0).toUpperCase();

  // var charIndex = initials.charCodeAt(0) - 65,
  //   colourIndex = charIndex % 19;

  // var canvas = document.getElementById("user-icon");
  // var context = canvas.getContext("2d");

  // var canvasWidth = $(canvas).attr("width"),
  //   canvasHeight = $(canvas).attr("height"),
  //   canvasCssWidth = canvasWidth,
  //   canvasCssHeight = canvasHeight;

  // if (window.devicePixelRatio) {
  //   $(canvas).attr("width", canvasWidth * window.devicePixelRatio);
  //   $(canvas).attr("height", canvasHeight * window.devicePixelRatio);
  //   $(canvas).css("width", canvasCssWidth);
  //   $(canvas).css("height", canvasCssHeight);
  //   context.scale(window.devicePixelRatio, window.devicePixelRatio);
  // }

  // context.fillStyle = colours[colourIndex];
  // context.fillRect(0, 0, canvas.width, canvas.height);
  // context.font = "128px Arial";
  // context.textAlign = "center";
  // context.fillStyle = "#FFF";
  // context.fillText(initials, canvasCssWidth / 2, canvasCssHeight / 1.5);
});
