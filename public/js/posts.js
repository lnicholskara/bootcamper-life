$(document).ready(function() {
  // // Get references to page elements
  var postTitle = $("#post-title");
  var postCategory = $("#post-category");
  var postBody = $("#post-body");
  var cmsForm = $("#cms");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();

    console.log(postBody, postTitle);
    // Wont submit the post if we are missing a body or title
    if (!postTitle.val().trim() || !postBody.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: postTitle.val().trim(),
      body: postBody.val().trim(),
      category: postCategory.val().trim()
    };

    console.log(newPost);
    submitPost(newPost);
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/posts";
    });
  }
});
