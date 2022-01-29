import { existingData } from "./updateData.js";

// code to vote, to display and to update in localStorage
function plusBtn(e) {
  let plus = e.target.parentNode.parentNode;
  let score = plus.getElementsByTagName("p")[0].innerText;
  let elementId = plus.parentNode.id;
  score = parseInt(score) + 1;
  plus.getElementsByTagName("p")[0].innerText = score;

  for (let s = 0; s < existingData.comments.length; s++) {
    if (existingData.comments[s].id == elementId) {
      existingData.comments[s].score = score;
      localStorage.setItem("data", JSON.stringify(existingData));
    }
    for (let si = 0; si < existingData.comments[s].replies.length; si++) {
      if (existingData.comments[s].replies[si].id == elementId) {
        existingData.comments[s].replies[si].score = score;
        localStorage.setItem("data", JSON.stringify(existingData));
      }
    }
  }
}

function minusBtn(e) {
  let minus = e.target.parentNode.parentNode;
  let score = minus.getElementsByTagName("p")[0].innerText;
  let elementId = minus.parentNode.id;
  score = parseInt(score) - 1;
  minus.getElementsByTagName("p")[0].innerText = score;
  for (let s = 0; s < existingData.comments.length; s++) {
    if (existingData.comments[s].id == elementId) {
      existingData.comments[s].score = score;
      localStorage.setItem("data", JSON.stringify(existingData));
    }
    for (let si = 0; si < existingData.comments[s].replies.length; si++) {
      if (existingData.comments[s].replies[si].id == elementId) {
        existingData.comments[s].replies[si].score = score;
        localStorage.setItem("data", JSON.stringify(existingData));
      }
    }
  }
}

export { plusBtn, minusBtn };
