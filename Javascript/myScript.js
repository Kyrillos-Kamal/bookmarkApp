var siteName = document.getElementById("siteName"),
  siteLink = document.getElementById("siteLink"),
  submitBtn = document.getElementById("submitBtn"),
  siteContainer;
var localStorageData = localStorage.getItem("SiteLists");
if (localStorageData) {
  siteContainer = JSON.parse(localStorageData);
  displaySiteList(siteContainer);
} else {
  siteContainer = [];
}

function addWebsiteLists() {
  var siteList = {
    name: siteName.value,
    link: siteLink.value,
  };

  if (validateLink) {
    siteContainer.push(siteList);
    setToLocalStorage();
    displaySiteList(siteContainer);
    clearInputs();
  } else {
    document.getElementById("error-link").innerHTML =
    "<span class='text-danger '>Not valid Link</span>";
    siteLink.style.borderColor = "red";
    
  }
}
function clearInputs() {
  siteName.value = "";
  siteLink.value = "";
}
function displaySiteList(siteContainer) {
  var siteCartona = ``;
  for (let i = 0; i < siteContainer.length; i++) {
    siteCartona += `  <div class="col-md-4 mb-3 text-center">
    <div class="bg-secondary py-3">
      <p class="text-white fw-bold fs-5">${siteContainer[i].name}</p>
      <div>
        <a
          href="${siteContainer[i].link}"
          target="_blank"
          class="btn btn-primary text-white text-decoration-none px-3"
          id="visitBtn"
          >Visit</a
        >
        <button class="btn btn-danger px-3 shadow-none" onClick="deleteSite(${i})" id="deleteBtn">
          Delete
        </button>
      </div>
    </div>
  </div>`;
  }
  document.getElementById("siteData").innerHTML = siteCartona;
}

function setToLocalStorage() {
  localStorage.setItem("SiteLists", JSON.stringify(siteContainer));
}
// function getFromLocalStorage() {
//   JSON.parse(localStorage.getItem("SiteLists"));
// }
function deleteSite(index) {
  siteContainer.splice(index, 1);
  setToLocalStorage();
  displaySiteList(siteContainer);
}

function validateLink(str) {
  var regEx =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  var res = str.matches(regEx);
  return res;
}
