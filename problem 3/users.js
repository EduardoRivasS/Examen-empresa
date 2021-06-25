const db = firebase.firestore();

const taskContainer = document.getElementById("task-container");
const modalContainer = document.getElementById("modal-container");

let editStatus = false;
const getUser = (id) => db.collection("users").doc(id).get();
const onGetTasks = (callback) => db.collection("users").onSnapshot(callback);
const deleteUser = (id) => db.collection("users").doc(id).delete();
const updateUser = (id, updatedTask) =>
  db.collection("users").doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      taskContainer.innerHTML += `<tr>
            <td>${doc.data().username}</td>
            <td>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-warning me-md-2" type="button" id="btnEdit" data-id="${
                  doc.id
                }"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  Edit
                </button>
                <button class="btn btn-danger" type="button" id="btnDelete" data-id="${
                  doc.id
                }">
                  Delete
                </button>
              </div>
            </td>
          </tr>`;
      const btnDelete = document.querySelectorAll("#btnDelete");
      btnDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteUser(e.target.dataset.id);
        });
      });
      const btnEdit = document.querySelectorAll("#btnEdit");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getUser(e.target.dataset.id);
          const task = doc.data();

          editStatus = true;
          id = doc.id;

          modalContainer["username"].value = task.username;
          modalContainer["password"].value = task.password;

          modalContainer["btnUser"].innerText = "Update";
        });
      });
    });
  });
});

function statusChange() {
  var combo = document.getElementById("status");
  var selectedStatus = combo.options[combo.selectedIndex].text;
  return selectedStatus;
}

function assignedTo() {
  var combo = document.getElementById("assignedToSelect");
  var selectedUser = combo.options[combo.selectedIndex].text;
  return selectedUser;
}

function addUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!editStatus) {
    db.collection("users").doc().set({
      username,
      password,
    });
  } else {
    updateUser(id, {
      username: username,
      password: password,
    });
    editStatus = false;
    modalContainer["btnUser"].innerText = "Add User";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function closeModal() {
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}
