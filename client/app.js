const form = document.getElementById("statusForm");

 // this function gets all the statuses from our Database via our API and renders them on the page
async function displayFeed() {
  const response = await fetch("https://fz-fb-server.onrender.com/statuses");
  const post = await response.json();
  const feed = document.getElementById("feed");

// for each post in the data base, we create elements for username, status and delete button

  post.forEach(function (post) {
    const h6 = document.createElement("h6");
    const p = document.createElement("p");
    const deleteButton = document.createElement("button");

  // then populate these elements with the data matching username, status from database
    h6.textContent = post.username;
    p.textContent = post.status;
    deleteButton.textContent = "x";


 // then apend them to the feed
    feed.appendChild(h6);
    feed.appendChild(p);
    feed.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      deletePost(post.id)});
});
}

displayFeed();


// when someone adds a new status this function runs

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("user clicked share");
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  const response = await fetch("https://fz-fb-server.onrender.com",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formValues),
  });

  const json = await response.json();
  const feed = document.getElementById("feed");
    feed.innerHTML = ""
    
    displayFeed();

});


// this function will delete statuses from the feed
async function deletePost(postId) {
    const response = await fetch(`https://fz-fb-server.onrender.com/statuses/${postId}`, { 
      method: "DELETE",
    });

    const feed = document.getElementById("feed");
    feed.innerHTML = ""
    
    displayFeed();
};



