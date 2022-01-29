import { confirmBox } from "./confirmBox.js";
import { existingData, retrieve } from "./updateData.js";

// function to delete main users comment
function del(e) {
  let toDel = e.target.parentNode.parentNode.parentNode.parentNode;
  confirmBox(
    "Delete comment",
    "Are you sure you want to delete thiscomment? this will remove comment and can't be undone",
    "YES, DELETE",
    "NO, CANCEL",
    toDel
  );
}

// create edit ability
function edit(e) {
  let toEdit = e.target.parentNode.parentNode.parentNode.parentNode;

  let elToReplace = toEdit.lastChild;
  let editInpBtnDiv = document.createElement("div");
  let editInput = document.createElement("textarea");
  let editBtn = document.createElement("button");
  editInpBtnDiv.className = "editInpBtnDiv";
  editBtn.className = "updateBtn";
  editInput.className = "allInpArea";
  editBtn.innerText = "UPDATE";

  // here edit version is dispayed and updated in localStorage as well
  editBtn.addEventListener("click", function (e) {
    let commentSectText;
    let updatedComment = e.target.previousSibling.value;
    let parentNodeId = e.target.parentNode.parentNode.id;
    let commentSection = document.getElementById(parentNodeId);
    let comment = commentSection.lastChild.firstChild.value;
    let replyingTo = document.createElement("span");
    let content = document.createElement("p");
    let divToReplace = e.target.parentNode;
    content.className = "comment";
    //if comment for editing is a reply comment we need this code to keep @username in this comment
    if (e.target.parentNode.parentNode.parentNode.className === "replyComment") {
      commentSectText = updatedComment.substring(updatedComment.indexOf(" ") + 1);
      let replyingToName = commentSection.lastChild.firstChild.value.split(" ")[0];
      replyingTo.textContent = replyingToName + " ";
      content.appendChild(replyingTo);
      replyingTo.after(commentSectText);
    } else {
      // ths code just needs comment without @username cause it is mainc comment section
      content.textContent = comment;
    }
    divToReplace.replaceWith(content);

    // update localStorage as well
    for (let cmnt = 0; cmnt < existingData.comments.length; cmnt++) {
      // main comments
      if (existingData.comments[cmnt].id == parentNodeId) {
        existingData.comments[cmnt].content = comment;
        localStorage.setItem("data", JSON.stringify(existingData));
      }

      for (let repCmnt = 0; repCmnt < existingData.comments[cmnt].replies.length; repCmnt++) {
        // replies
        if (existingData.comments[cmnt].replies[repCmnt].id == parentNodeId) {
          existingData.comments[cmnt].replies[repCmnt].content = commentSectText;
          localStorage.setItem("data", JSON.stringify(existingData));
        }
      }
    }
  });
  // to keep in typeing area old text when editing
  if (elToReplace.className == "comment") {
    editInput.value = elToReplace.textContent;
  }
  editInpBtnDiv.appendChild(editInput);
  editInpBtnDiv.appendChild(editBtn);
  toEdit.replaceChild(editInpBtnDiv, elToReplace);
}

export { edit, del };
