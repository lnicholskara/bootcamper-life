$(document).ready(function() {
  
  var userProfiles;

  $.get("/api/users/", function(data) {
    console.log("Profiles", data);
    userProfiles = data;
    for (var i = 0; i < userProfiles.length; i++) {
      console.log(
        "the current profile: ",
        userProfiles[i].first_name + userProfiles[i].last_name
      );
      var profileInfo = {
        firstName: userProfiles[i].first_name,
        lastName: userProfiles[i].last_name,
        school: userProfiles[i].school,
        graduated: userProfiles[i].graduated_yet,
        city: userProfiles[i].city,
        state: userProfiles[i].state,
        github: userProfiles[i].github_link
      };