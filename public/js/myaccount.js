$(document).ready(function() {
  function getUserProf() {
    $.get("/api/myuser", function(data) {
      console.log("Posts", data);
    });
  }
  getUserProf();
});
