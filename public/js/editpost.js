$(document).ready(function() {
  var url = event.path[1].location.href;
  var postId;
  if (url.indexOf("/editpost=") !== -1) {
    postId = url.split("=")[1];
    console.log(postId);
    getPostInfo(postId);
  } else {
    console.log("No post with this ID exists");
  }
  // Get references to page elements
  var displayTitle = $("#post-title");
  var displayCategory = $("#post-category");
  var displayBody = $("#post-body");
  var saveButton = $("#submit");

  $(saveButton).on("click", savePost);

  function getPostInfo(postId) {
    $.get("/api/posts/" + postId, function(data) {
      console.log("Current Post: ", data);

      displayPostInfo(data);
    });
  }

  function displayPostInfo(data) {
    displayTitle.val(data.title);
    displayCategory.val(data.category);
    displayBody.val(data.body);
  }

  // A function for handling what happens when the form to create a new post is submitted
  function savePost(event) {
    event.preventDefault();
    // Constructing a newPost object to hand to the database
    var newInfo = {
      title: displayTitle.val().trim(),
      category: displayCategory.val().trim(),
      body: displayBody.val().trim(),
      id: postId
    };
    console.log(newInfo);
    updatePost(newInfo);
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(data) {
    $.ajax({
      method: "PUT",
      url: "/api/posts/" + data.id,
      data: data
    }).then(function() {
      window.location.reload();
    });
  }
});
