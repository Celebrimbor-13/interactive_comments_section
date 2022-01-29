import { existingData } from "./updateData.js";

// code to create confirm box when main user decides to delete comment
function confirmBox(title, msg, isTrue, isFalse, toDel) {
  let divPart =
    "<div class='dialog-ovelay'>" +
    "<div class='dialog'><header>" +
    " <h3> " +
    title +
    " </h3> " +
    "</header>" +
    "<div class='dialog-msg'>" +
    " <p> " +
    msg +
    " </p> " +
    "</div>" +
    "<footer>" +
    "<div class='controls'>" +
    " <button class='button button-danger doAction'>" +
    isTrue +
    "</button> " +
    " <button class='button button-default cancelAction'>" +
    isFalse +
    "</button> " +
    "</div>" +
    "</footer>" +
    "</div>" +
    "</div>";

  let htmlBox = new DOMParser().parseFromString(divPart, "text/html");
  document
    .getElementsByTagName("body")[0]
    .prepend(htmlBox.firstChild.lastChild.firstChild);

  let yesDel = document.getElementsByClassName("doAction")[0];
  let noDel = document.getElementsByClassName("cancelAction")[0];
  let overlayBox = document.getElementsByClassName("dialog-ovelay")[0];
  // functuality to remove that part from the view
  if (yesDel) {
    yesDel.addEventListener("click", function () {
      console.log(toDel.id);
      if (toDel.parentNode.id !== "root") {
        toDel.parentNode.remove();
      } else {
        toDel.remove();
      }

      overlayBox.remove();
      // and remove from localStorage that object
      for (let y = 0; y < existingData.comments.length; y++) {
        existingData.comments = existingData.comments.filter((item) => {
          return item.id != toDel.id;
        });
        for (let yi = 0; yi < existingData.comments[y].replies.length; yi++) {
          existingData.comments[y].replies = existingData.comments[y].replies.filter(
            (item) => {
              return item.id != toDel.id;
            }
          );
        }
      }
      localStorage.setItem("data", JSON.stringify(existingData));
    });
  }

  if (noDel) {
    noDel.addEventListener("click", function () {
      overlayBox.remove();
    });
  }
}

export { confirmBox };
