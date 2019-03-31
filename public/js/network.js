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
        github: profiles[i].github_link,
        email: profiles[i].email
      };

      var colFirstName = $("<td>");
      var colLastName = $("<td>");
      var colSchool = $("<td>");
      var colCity = $("<td>");
      var colState = $("<td>");
      var colGraduated = $("<td>");
      var githubLink = $("<a target='_blank'>");
      var emailLink = $("<a target='_blank'>");
      var singleProfile = $("<tr>");

      colFirstName.text(profileInfo.firstName);
      singleProfile.append(colFirstName);
      colLastName.text(profileInfo.lastName);
      singleProfile.append(colLastName);
      colSchool.text(profileInfo.school);
      singleProfile.append(colSchool);
      colCity.text(profileInfo.city);
      singleProfile.append(colCity);
      colState.text(profileInfo.state);
      singleProfile.append(colState);
      colGraduated.text(profileInfo.graduated);
      singleProfile.append(colGraduated);
      githubLink.html(
        "<td>" +
          "<i style='color:black' class = 'fa-2x fab fa-github-square'></i></a>" +
          "</td>"
      );
      githubLink.attr("href", profileInfo.github);
      emailLink.html(
        "<td>" +
          "<i style='color:black' class='fa-2x fas fa-envelope-square'></i></a>" +
          "</td>"
      );
      emailLink.attr("href", "mailto:" + profileInfo.email);
      singleProfile.append(githubLink);
      singleProfile.append(emailLink);

      $("tbody").append(singleProfile);
    }
  });
});
