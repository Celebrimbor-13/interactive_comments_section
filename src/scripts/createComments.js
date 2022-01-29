import { commentLayout } from "./commentLayout.js";
import { ownerTypeSection } from "./ownerTypeSection.js";

// if there is no data in localStorage, first add.
let data = require("../../data.json");
if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("id", "4");
}
// after retrive
let existingData = JSON.parse(localStorage.getItem("data"));

// this part is to create comment section with its replies
function createComments() {
  existingData.comments.sort((a, b) => {
    return b["score"] - a["score"];
  });
  // and plus create user are for typing
  ownerTypeSection();

  // retrieve all we need from localStorage
  for (let c = 0; c < existingData.comments.length; c++) {
    let userComments = existingData.comments[c];
    let id = userComments.id;
    let comment = userComments.content;
    let date = userComments.createdAt;
    let vote = userComments.score;
    let image = userComments.user.image.png;
    let userName = userComments.user.username;
    // and pass to code which is responsible to create html
    commentLayout(id, comment, date, vote, image, userName);

    if (userComments.replies.length) {
      for (let r = 0; r < userComments.replies.length; r++) {
        let userReplies = userComments.replies[r];
        let id = userReplies.id;
        let comment = userReplies.content;
        let date = userReplies.createdAt;
        let vote = userReplies.score;
        let image = userReplies.user.image.png;
        let userName = userReplies.user.username;
        let replyingTo = userReplies.replyingTo;
        commentLayout(id, comment, date, vote, image, userName, replyingTo);
      }
    }
  }
}

export { createComments, existingData };
