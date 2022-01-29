import { existingData, retrieve } from "./updateData.js";

// code to create section where user can type for reply

function replyAbility(e) {
  let spaceForType = document.createElement("div");
  let replyButtonParent = e.target.parentNode.parentNode.parentNode;
  let toWhom = replyButtonParent.childNodes[1].childNodes[0].textContent;
  spaceForType.className = "timeToReply";

  if (replyButtonParent.parentNode.className === "replyComment") {
    replyButtonParent.parentNode.after(spaceForType);
  } else {
    replyButtonParent.after(spaceForType);
  }

  let typeDiv = document.createElement("div");
  let img = document.createElement("img");
  let inputArea = document.createElement("textarea");
  let replyButton = document.createElement("button");
  typeDiv.className = "typeArea";
  img.src = existingData.currentUser.image.png;
  inputArea.placeholder = "Add a comment...";
  inputArea.className = "allInpArea";
  replyButton.innerText = "REPLY";

  typeDiv.appendChild(img);
  typeDiv.appendChild(inputArea);
  typeDiv.appendChild(replyButton);

  if (spaceForType) {
    // this will display replied comment on screen
    replyButton.addEventListener("click", retrieve);
    spaceForType.appendChild(typeDiv);
    inputArea.value = "@" + toWhom + " ";
  }
}

export { replyAbility };
