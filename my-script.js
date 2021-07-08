// add event listener to destination_form
document.querySelector("#destination_form").addEventListener("submit", handleFormSubmit);

// handle the submit event on form
function handleFormSubmit(event) {

  event.preventDefault();

  let name = event.target.elements["name"].value;
  let location = event.target.elements["location"].value;
  let photoUrl = event.target.elements["photo"].value;
  let description = event.target.elements["description"].value;

  // create card
  let card = createCard(name, location, photoUrl, description);

  let wishList = document.querySelector("#destinations_list");

  if (wishList.children.length === 0) {
    document.querySelector("#list_title").innerHTML = "My Destinations WishList";
  }

  // append card to wish list
  wishList.appendChild(card);

  // clear the content in the input form
  let func = ((form) => {
    for (let i = 0; i < form.length; i++) {
      form.elements[i].value = "";
    }
  })(event.target);
}

// create card
function createCard(name, location, photoUrl, description) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "10px";

  // create img, and append it to card
  card.appendChild(createImg(name, photoUrl));

  // create body of card, and append it to card
  card.appendChild(createCardBody(name, location, description));

  // create botton container, and append the button container to card
  card.appendChild(createButtonsContainer());

  return card;
}

function createImg(name, photoUrl) {
  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", name);

  let constantPhotoUrl =
    "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
  if (photoUrl.length === 0) {
    img.setAttribute("src", constantPhotoUrl);
  } else {
    img.setAttribute("src", photoUrl);
  }
  return img;
}

function createCardBody(name, location, description) {
  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  // create name of card, and then append it to card body
  let cardName = document.createElement("h5");
  cardName.setAttribute("class", "card-Name");
  cardName.innerText = name;
  cardBody.appendChild(cardName);
  
  
  // create location of card, and then append it to card body
  let cardLocation = document.createElement("h6");
  cardLocation.setAttribute("class", "card-location mb-2 text-muted");
  cardLocation.innerText = location;
  cardBody.appendChild(cardLocation);
  
  // create description of card, and then append it to card body
  let cardText = document.createElement("p");
  cardText.setAttribute("class", "card-description");
  cardText.innerText = description;
  cardBody.appendChild(cardText);

  return cardBody;
}

function createButtonsContainer() {
  let buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");

  // create edit button, and then append it to button container
  let cardEditBtn = document.createElement("button");
  cardEditBtn.setAttribute("class", "btn btn-warning");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editCard);
  buttonsContainer.appendChild(cardEditBtn);

  // create delete button, and then append it to button container
  let cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.setAttribute("class", "btn btn-danger");
  cardDeleteBtn.innerText = "Remove";
  cardDeleteBtn.addEventListener("click", removeCard);
  buttonsContainer.appendChild(cardDeleteBtn);

  return buttonsContainer;
}

// handle the edit click event
function editCard(event) {
  let card = event.target.parentElement.parentElement;

  let cardBody = card.children[1];
  let cardName = cardBody.children[0];
  let cardLocation = cardBody.children[1];
  let cardDescription = cardBody.children[2];

  let photoUrl = card.children[0];

  let newName = window.prompt("Enter new name");
  let newLocation = window.prompt("Enter new location");
  let newPhotoUrl = window.prompt("Enter new photo url");
  let newDescription = window.prompt("Enter new description");

  if (newName.length > 0) {
    cardName.innerText = newName;
  }

  if (newLocation.length > 0) {
    cardLocation.innerText = newLocation;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }

  if (newDescription.length > 0) {
    cardDescription.innerText = newDescription;
  }
}

// handle the remove click event
function removeCard(event) {
  let card = event.target.parentElement.parentElement;
  card.remove();

  let wishList = document.querySelector("#destinations_list");
  if (wishList.children.length === 0) {
    document.querySelector("#list_title").innerHTML = "Enter destination details";
  }  
}



