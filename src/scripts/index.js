import { createComments } from "./createComments.js";
import "../css/index.css";

createComments();

// code to moake changes in localStorage when user replies to main comment
function viewResult(replyObj, existingData) {
  for (let o = 0; o < existingData.comments.length; o++) {
    if (replyObj.replyingTo === existingData.comments[o].user.username) {
      existingData.comments[o].replies.push(replyObj);
      localStorage.setItem("data", JSON.stringify(existingData));
    } else {
      // and when replying to comment under main comment
      for (let oi = 0; oi < existingData.comments[o].replies.length; oi++) {
        if (existingData.comments[o].replies[oi].user.username == replyObj.replyingTo) {
          existingData.comments[o].replies.push(replyObj);
          localStorage.setItem("data", JSON.stringify(existingData));
        }
      }
    }
  }
}

export { viewResult };
