
var bookmarkList = document.getElementById("bookmarkList");
var bookmarkForm = document.getElementById("bookmarkForm");
var bookmarkHolder = document.getElementById("bookmarkHolder")
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var deleteBtn = document.getElementById("deleteBtn");


var bookmarks = [];

if (localStorage.getItem('bookmarks') != null) {
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  displayBookmarks()
} else {
  bookmarks = []

}

function addBookmark() {
  const id = bookmarks.length + 1;
  const name = siteName.value.trim();
  const url = siteURL.value.trim();
  if (name === "" || url === "") {
    Swal.fire({
      title: "Something is Empty",
      text: "Please fill in both fields.",
      icon: "question"
    });
    return;
  }
  if (!isValidName(name)) {
    Swal.fire({
      icon: "error",
      title: "Name is not valid",
      text: "Name Must be at least 3 characters long",
    });
    return;
  }

  if (!isValidUrl(url)) {
    Swal.fire({
      icon: "error",
      title: "Url is not valid",
      text: "Site URL must be a valid one e.g., https://google.com",
    });
    return;
  }
  const bookmark = { id, name, url };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

}

function displayBookmarks() {
  var holder = '';

  if (bookmarks.length === 0) {
    bookmarkHolder.classList.add("d-none");
  } else {
    bookmarkHolder.classList.remove("d-none");

    for (var i = 0; i < bookmarks.length; i++) {
      holder += `
        <tr>
          <td>${i + 1}</td>
          <td>${bookmarks[i].name}</td>
          <td><a href="#" class="btn btn-success text-white btn-sm" onclick="validateAndVisit('${bookmarks[i].url}')"><i class="bi bi-box-arrow-up-right"></i> Visit</a></td>
          <td><button class="btn btn-danger btn-sm" onClick="deleteBookmark(${i})"><i class="bi bi-trash"></i> Delete</button></td></tr>
      `;
    }
  }

  bookmarkList.innerHTML = holder;
}


function clearForm() {
  siteName.value = ''
  siteURL.value = ''
}

function isValidName(name) {
  var namePattern = /^[A-Za-z\s]{3,}$/;
  return namePattern.test(name);
}

function isValidUrl(url) {
  var urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/igm;
  return urlPattern.test(url);
}

function validateAndVisit(url) {
  if (isValidUrl(url)) {
    window.open(url, "_blank");
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "This bookmark has an invalid or malformed URL.",
    });
  }
}

function deleteBookmark(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      bookmarks.splice(index, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      displayBookmarks();
      Swal.fire("Deleted!", "Your bookmark has been deleted.", "success");
    }
  });

}


bookmarkForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookmark()
  displayBookmarks()
  clearForm()
}
)
