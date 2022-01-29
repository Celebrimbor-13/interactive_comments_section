import { existingData } from "./createComments.js";
import { edit, del } from "./ownerDelEdit.js";
import { replyAbility } from "./reply.js";
import { plusBtn, minusBtn } from "./score.js";

// this part of code will create dynamic html
function commentLayout(
  id,
  comment,
  date,
  vote,
  image,
  userName,
  replyingTo,
  buttonClicked
) {
  let wrapReplies = document.createElement("div");

  let root = document.getElementById("root");
  let commentSection = document.createElement("div");
  let commentHead = document.createElement("div");
  let createdAt = document.createElement("div");
  let reply = document.createElement("div");
  let replyBtn = document.createElement("span");
  let user = document.createElement("div");
  let score = document.createElement("div");
  let scoreNum = document.createElement("p");
  let plusDiv = document.createElement("div");
  let plus = document.createElement("img");
  let minusDiv = document.createElement("div");
  let minus = document.createElement("img");
  let content = document.createElement("p");
  commentSection.id = id;
  commentSection.className = "containers";
  commentHead.className = "comHeader";
  createdAt.className = "date";
  createdAt.innerText = date;
  reply.className = "reply";
  replyBtn.innerText = "Reply";
  reply.appendChild(document.createElement("img")).src = "./images/icon-reply.svg";
  reply.appendChild(replyBtn);
  user.className = "photoNname";
  user.appendChild(document.createElement("img")).src = image;
  user.appendChild(document.createElement("span")).innerText = userName;
  score.className = "vote";
  scoreNum.innerText = vote;
  plusDiv.className = "plus";
  plus.src = "./images/icon-plus.svg";
  plusDiv.appendChild(plus);
  minusDiv.className = "minus";
  minusDiv.appendChild(minus);
  minus.src = "./images/icon-minus.svg";
  score.prepend(plusDiv);
  score.append(scoreNum);
  score.append(minusDiv);
  content.className = "comment";
  content.innerText = comment;

  plus.addEventListener("click", plusBtn);
  minus.addEventListener("click", minusBtn);
  replyBtn.addEventListener("click", replyAbility);

  // if comment is of main user add edit and delete possibility and alter design little bit
  if (userName === existingData.currentUser.username) {
    let delDiv = document.createElement("div");
    let editDiv = document.createElement("div");
    let edt = document.createElement("span");
    let dlt = document.createElement("span");
    edt.innerText = "Edit";
    dlt.innerText = "Delete";
    delDiv.appendChild(document.createElement("img")).src = "./images/icon-delete.svg";
    delDiv.appendChild(dlt);
    editDiv.appendChild(document.createElement("img")).src = "./images/icon-edit.svg";
    editDiv.appendChild(edt);
    user.appendChild(document.createElement("b")).innerText = "you";
    reply = document.createElement("div");
    reply.className = "deleteNedit";
    reply.appendChild(delDiv);
    reply.appendChild(editDiv);

    edt.addEventListener("click", edit);
    dlt.addEventListener("click", del);
  }

  // this part is responsible for design of the area if main user is replying to somebody

  if (replyingTo) {
    let atReplay = document.createElement("span");
    atReplay.innerText = "@" + replyingTo + " ";
    content.prepend(atReplay);
    wrapReplies.className = "replyComment";
    wrapReplies.appendChild(commentSection);

    if (buttonClicked && buttonClicked.innerText === "REPLY") {
      buttonClicked.parentNode.parentNode.replaceWith(wrapReplies);
    } else {
      root.appendChild(wrapReplies);
    }
  } else {
    root.appendChild(commentSection);
  }

  commentHead.appendChild(user);
  commentHead.appendChild(createdAt);
  commentHead.appendChild(reply);

  commentSection.appendChild(commentHead);
  commentSection.prepend(score);
  commentSection.appendChild(content);
}

export { commentLayout };
