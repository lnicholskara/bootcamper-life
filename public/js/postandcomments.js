document.addEventListener("DOMContentLoaded", function(event) {
  var url = event.path[1].location.href;
  var postId;
  if (url.indexOf("/posts=") !== -1) {
    postId = url.split("=")[1];
    console.log(postId);
    getPostByID(postId);
  } else {
    console.log("No post with this ID exists");
  }

  function getPostByID(postID) {
    $.get("/api/posts/" + postID, function(data) {
      console.log("Posts", data);
      populatePostInfo(data);
    });
  }

  function populatePostInfo(post) {
    var formattedDate = new Date(post.updatedAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");

    $("#post_Title").text(post.title);
    $("#post_Category").text(post.category);
    $("#post_Body").text(post.body);
    $("#post_Author").text(post.User.first_name + " " + post.User.last_name);
    $("#post_UpdatedAt").text(formattedDate);
  }
  ///***************************** */

  var commentContainer = $("#commentContainer");
  var comments;

  $.get("/api/comments/" + postId, function(data) {
    console.log("Comments", data);
    comments = data;
    if (!comments || !comments.length) {
      console.log("no comments yet");
    } else {
      initializeRows();
    }
  });

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    console.log(comments);
    commentContainer.empty();
    var commentsToAdd = [];
    for (var i = 0; i < comments.length; i++) {
      var commentAuthor =
        comments[i].User.first_name + " " + comments[i].User.last_name;
      commentsToAdd.push(createNewRow(comments[i], commentAuthor));
    }
    console.log(commentsToAdd);
    commentContainer.append(commentsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(comment, author) {
    console.log(comment);
    var formattedDate = new Date(comment.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
    var newPostCard = $("<div>");
    var newPostAuthor = $("<small>");
    var newPostDate = $("<small>");
    var newPostBody = $("<p>");
    newPostAuthor.attr("id", "black-author");
    newPostAuthor.addClass("float-right");
    newPostCard.addClass("mr-2");
    newPostDate.attr("id", "grey-date");
    newPostBody.attr("id", "black-comment");
    newPostDate.text(formattedDate);
    newPostAuthor.text(author);
    newPostAuthor.append("<br>");
    newPostBody.text(comment.body);
    newPostAuthor.append(newPostDate);
    newPostBody.append("<br><br>");
    newPostBody.append(newPostAuthor);
    newPostCard.append(newPostBody);
    newPostCard.append("<br><br>");
    newPostCard.data("comment", comment);
    return newPostCard;
  }

  //************************ */
  var commentBody = $("#comment-body");
  var comForm = $("#commentForm");
  // Adding an event listener for when the form is submitted
  $(comForm).on("submit", handleFormSubmit);

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    console.log("is this working?");
    event.preventDefault();

    console.log(commentBody);
    // Wont submit the post if we are missing a body or title
    if (!commentBody.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newComment = {
      body: commentBody.val().trim(),
      PostId: postId
    };

    console.log(newComment);
    submitComment(newComment);
  }

  // Submits a new post and brings user to blog page upon completion
  function submitComment(comment) {
    $.post("/api/comments", comment, function() {
      window.location.reload();
    });
  }
});
