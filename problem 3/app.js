const db = firebase.firestore();

const taskContainer = document.getElementById("task-container");
const modalContainer = document.getElementById("modal-container");
const assignedToSelect = document.getElementById("assignedToSelect");
const filterUser = document.getElementById("filterUser");
const alertDelete = document.getElementById("alertDelete");

let editStatus = false;
let id = "";
//tasksFilter

//tasks
const getTask = (id) => db.collection("tasks").doc(id).get();
const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);
const onGetUsersSelect = (callback) =>
  db.collection("users").onSnapshot(callback);
const deleteTask = (id) => db.collection("tasks").doc(id).delete();
const updateTask = (id, updatedTask) =>
  db.collection("tasks").doc(id).update(updatedTask);

function userFilter() {
  var combo = document.getElementById("filterUser");
  var selectedfilterUser = combo.options[combo.selectedIndex].text;
  var combo2 = document.getElementById("filterStatus");
  var selectedfilterStatus = combo2.options[combo2.selectedIndex].text;
  const onGetTasksFilter = (callback) =>
    db
      .collection("tasks")
      .where("userAssigned", "==", selectedfilterUser)
      .where("status", "==", selectedfilterStatus)
      .onSnapshot(callback);
  onGetTasksFilter((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      taskContainer.innerHTML += `<tr>
            <td>${doc.data().taskName}</td>
            <td>${doc.data().userAssigned}</td>
            <td>${doc.data().status}</td>
            <td>${doc.data().deadline}</td>
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
          const task2 = doc.data();
          if (task2.status == "Completed") {
            await deleteTask(e.target.dataset.id);
          } else {
            alertDelete.innerHTML = alert("'status' need to be Completed");
          }
        });
      });
      const btnEdit = document.querySelectorAll("#btnEdit");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          editStatus = true;
          id = doc.id;

          modalContainer["task-name"].value = task.taskName;
          modalContainer["deadline"].value = task.deadline;

          modalContainer["btnTask"].innerText = "Update";
        });
      });
    });
  });
  return selectedfilterUser;
}

function cleanFilter() {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      taskContainer.innerHTML += `<tr>
            <td>${doc.data().taskName}</td>
            <td>${doc.data().userAssigned}</td>
            <td>${doc.data().status}</td>
            <td>${doc.data().deadline}</td>
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
          const task2 = doc.data();
          if (task2.status == "Completed") {
            await deleteTask(e.target.dataset.id);
          } else {
            alertDelete.innerHTML = alert("'status' need to be Completed");
          }
        });
      });
      const btnEdit = document.querySelectorAll("#btnEdit");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          editStatus = true;
          id = doc.id;

          modalContainer["task-name"].value = task.taskName;
          modalContainer["deadline"].value = task.deadline;

          modalContainer["btnTask"].innerText = "Update";
        });
      });
    });
  });
}

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUsersSelect((querySnapshot) => {
    filterUser.innerHTML = "";
    assignedToSelect.innerHTML = "";
    querySnapshot.forEach((doc) => {
      assignedToSelect.innerHTML += `
        <option selected>${doc.data().username}</option>`;
      filterUser.innerHTML += `
        <option selected>${doc.data().username}</option>
        `;
    });
  });
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      taskContainer.innerHTML += `<tr>
            <td>${doc.data().taskName}</td>
            <td>${doc.data().userAssigned}</td>
            <td>${doc.data().status}</td>
            <td>${doc.data().deadline}</td>
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
          const task2 = doc.data();
          if (task2.status == "Completed") {
            await deleteTask(e.target.dataset.id);
          } else {
            alertDelete.innerHTML = alert("'status' need to be Completed");
          }
        });
      });
      const btnEdit = document.querySelectorAll("#btnEdit");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          editStatus = true;
          id = doc.id;

          modalContainer["task-name"].value = task.taskName;
          modalContainer["deadline"].value = task.deadline;

          modalContainer["btnTask"].innerText = "Update";
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

function task() {
  const taskName = document.getElementById("task-name").value;
  const deadline = document.getElementById("deadline").value;
  const userAssigned = assignedTo();
  const status = statusChange();
  const dateCreated = new Date();
  const dateUpdated = new Date();
  if (!editStatus) {
    db.collection("tasks").doc().set({
      dateCreated,
      dateUpdated,
      taskName,
      userAssigned,
      status,
      deadline,
    });
  } else {
    updateTask(id, {
      dateUpdated: dateUpdated,
      taskName: taskName,
      userAssigned: userAssigned,
      status: status,
      deadline: deadline,
    });
    editStatus = false;
    modalContainer["btnTask"].innerText = "Add Task";
    document.getElementById("task-name").value = "";
  }
  document.getElementById("task-name").value = "";
}

function closeModal() {
  document.getElementById("task-name").value = "";
}
