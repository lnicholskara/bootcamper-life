document.addEventListener("DOMContentLoaded", function(event) {
  var url = event.path[1].location.origin;
  console.log(url);
  var postsContainer = $("#postsContainer");
  var posts;

  $.get("/api/myposts/", function(data) {
    posts = data;
    if (!posts || !posts.length) {
      console.log("no posts yet");
    } else {
      initializeRows();
    }
  });

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    postsContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      var postAuthor = posts[i].User.first_name + " " + posts[i].User.last_name;
      postsToAdd.push(createNewRow(posts[i], postAuthor));
    }
    console.log(postsToAdd);
    postsContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post, author) {
    console.log(post);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");

    //Create variables
    var newPostCard = $("<div>");
    var card = $("<div>");
    var cardHeader = $("<div>");
    var row1 = $("<div>");
    var col12 = $("<div>");
    var span = $("<span>");
    var hr = $("<hr>");
    var row2 = $("<div>");
    var col9 = $("<div>");
    var link = $("<a>");
    var postTitle = $("<h3>");
    var col1 = $("<div>");
    var h1 = $("<h1>");
    var i = $("<i>");
    var deleteLink = $("<a>");
    var col2 = $("<div>");
    var postAuthor = $("<h5>");
    var postDate = $("<p>");
    var cardBody = $("<div>");
    var row3 = $("<div>");
    var col12Body = $("<div>");
    var postBody = $("<h5>");

    // Add classes + ids
    card.addClass("card mb-4");
    cardHeader.addClass("card-header");
    row1.addClass("row");
    col12.addClass("col-lg-12");
    span.addClass("badge badge-secondary");
    span.attr("id", "post_Category");
    hr.addClass("separator-md");
    row2.addClass("row");
    row2.attr("id", "singlePost");
    col9.addClass("col-lg-8 col-md-6 col-10 mb-3");
    postTitle.attr("id", "post_Title");
    col1.addClass("col-lg-1 col-2");
    i.addClass("fas fa-trash mt-2");
    col2.addClass("col-lg-3 col-md-4 d-none d-sm-none d-md-block");
    col2.attr("id", "user");
    postAuthor.attr("id", "post_Author");
    postDate.attr("id", "post_UpdatedAt");
    cardBody.addClass("card-body");
    row3.addClass("row");
    col12Body.addClass("col-lg-12");
    postBody.attr("id", "post_Body");

    //Insert info from posts
    span.text(post.category);
    postTitle.text(post.title);
    postAuthor.text(author);
    postDate.text(formattedDate);
    postBody.text(post.body);
    postTitle.attr(post.title);

    //Link title of post to unique post page
    var postLink = url + "/posts=" + post.id;
    console.log(postLink);
    $(link).attr("href", postLink);

    $(deleteLink).attr("href", postLink);

    //Append to page
    col12.append(span);
    row1.append(col12);
    cardHeader.append(row1);
    card.append(cardHeader);
    newPostCard.append(card);

    link.append(postTitle);
    col9.append(link);
    row2.append(col9);

    col2.append(postAuthor);
    col2.append(postDate);
    row2.append(col2);

    h1.append(i);
    col1.append(h1);
    row2.append(col1);

    card.append(hr);
    card.append(row2);

    card.append(hr);

    col12Body.append(postBody);
    row3.append(col12Body);
    cardBody.append(row3);
    card.append(cardBody);

    console.log(newPostCard);

    return newPostCard;
  }
});
