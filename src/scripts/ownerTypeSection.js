import { existingData } from "./createComments.js";
import moment from "moment";
import { commentLayout } from "./commentLayout.js";
// this code creates section for main user to type a comment
function ownerTypeSection() {
  let body = document.getElementsByTagName("body")[0];
  let ownerTypeDiv = document.createElement("div");
  let img = document.createElement("img");
  let inputArea = document.createElement("textarea");
  let sendButton = document.createElement("button");
  ownerTypeDiv.id = "ownerTypeSection";
  img.src = existingData.currentUser.image.png;
  inputArea.placeholder = "Add a comment...";
  inputArea.className = "allInpArea";
  sendButton.innerText = "SEND";
  sendButton.addEventListener("click", injectrComment);

  ownerTypeDiv.appendChild(img);
  ownerTypeDiv.appendChild(inputArea);
  ownerTypeDiv.appendChild(sendButton);
  body.appendChild(ownerTypeDiv);
}

// and we need create comment object for localStorage
function injectrComment(e) {
  let id = parseInt(localStorage.getItem("id"));
  id += 1;

  let ownerObj = {
    content: e.target.previousSibling.value,
    createdAt: moment(new Date()).fromNow(),
    id: id,
    replies: [],
    score: 0,
    user: {
      image: {
        png: existingData.currentUser.image.png,
      },
      username: existingData.currentUser.username,
    },
  };

  existingData.comments.push(ownerObj);
  localStorage.setItem("data", JSON.stringify(existingData));
  localStorage.setItem("id", id.toString());
  // for dispaying on screen immediately
  commentLayout(
    ownerObj.id,
    ownerObj.content,
    ownerObj.createdAt,
    ownerObj.score,
    ownerObj.user.image.png,
    ownerObj.user.username
  );
}

export { ownerTypeSection };
