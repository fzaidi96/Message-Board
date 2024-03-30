const form = document.getElementById("statusForm");

// Function to display feed
async function displayFeed() {
  const response = await fetch("https://fz-fb-server.onrender.com/");
  const posts = await response.json();
  const feed = document.getElementById("feed");

  // Sort posts in reverse chronological order based on index
  posts.sort((a, b) => b.id - a.id);

  // Clear previous feed content
  feed.innerHTML = "";

  // Loop through each post
  posts.forEach(function (post) {
    // Create elements for username, status, delete button, and upvote button
    const h6 = document.createElement("h6");
    const p = document.createElement("p");
    const deleteButton = document.createElement("button");
    const upvoteButton = document.createElement("button");

    // Populate elements with data
    h6.textContent = post.username;
    p.textContent = post.status;
    deleteButton.textContent = "x";
    upvoteButton.textContent = "Upvote";;

    // Append elements to the feed
    feed.appendChild(h6);
    feed.appendChild(p);
    feed.appendChild(deleteButton);
    feed.appendChild(upvoteButton);

    // Event listener for delete button
    deleteButton.addEventListener("click", function () {
      deletePost(post.id);
    });

    // Event listener for upvote button
    upvoteButton.addEventListener("click", async function () {
      const response = await fetch(`https://fz-fb-server.onrender.com/statuses/${post.id}/upvote`, {
        method: "POST",
      });
      if (response.ok) {
        // If upvote is successful, update the upvote count and re-render the feed
        post.upvotes++;
      }
    });
  });
}

// Add event listener for form submission
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("User clicked share");
  const formData = new FormData(form);
  
  // Remove upvotes field from form data
  formData.delete('upvotes');

  const formValues = Object.fromEntries(formData);

  // Send POST request to add new status
  const response = await fetch("https://fz-fb-server.onrender.com/statuses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  // Clear the feed and display updated feed
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  displayFeed();
});

// Function to delete post
async function deletePost(postId) {
  const response = await fetch(`https://fz-fb-server.onrender.com/statuses/${postId}`, {
    method: "DELETE",
  });

  // Clear the feed and display updated feed
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  displayFeed();
}

// Display feed on page load
displayFeed();
