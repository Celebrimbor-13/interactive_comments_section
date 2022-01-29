import moment from "moment";
import { commentLayout } from "./commentLayout.js";
import { existingData } from "./createComments.js";
import { viewResult } from "./index.js";

// here we create object,which is used when user replies or updates comment
function RepliesObj(id, content, createdAt, score, replyingTo, user, username, buttonClicked) {
  this.id = id;
  this.content = content;
  this.createdAt = createdAt;
  this.score = score;
  this.replyingTo = replyingTo;
  this.user = user;
  this.username = username;
  this.buttonClicked = buttonClicked;
}
// function aimed to that secction on which click was made
function retrieve(e) {
  let id = parseInt(localStorage.getItem("id"));
  id += 1;
  localStorage.setItem("id", id.toString());

  let buttonClicked = e.target;
  let textAreaValue = e.target.parentNode.getElementsByTagName("textarea")[0].value;
  let content = textAreaValue.substring(textAreaValue.indexOf(" ") + 1);
  let createdAt = moment(new Date()).fromNow();
  let score = 0;
  let replyingTo = textAreaValue.split(" ")[0].substring(1);
  let image = existingData.currentUser.image.png;
  let userName = existingData.currentUser.username;
  let user = {
    image: {
      png: image,
    },
    username: userName,
  };

  let replyObj = new RepliesObj(
    id,
    content,
    createdAt,
    score,
    replyingTo,
    user,
    userName,
    buttonClicked
  );

  // this creates comment if reply was clicked
  if (e.target.innerText == "REPLY") {
    commentLayout(
      replyObj.id,
      replyObj.content,
      replyObj.createdAt,
      replyObj.score,
      replyObj.user.image.png,
      replyObj.user.username,
      replyObj.replyingTo,
      buttonClicked
    );
  }

  //call function to update localstorage to keep replies and comment
  viewResult(replyObj, existingData);
}

export { retrieve, existingData };
