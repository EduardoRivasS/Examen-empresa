const db = firebase.firestore();

window.addEventListener("DOMContentLoaded", async (e) => {
  const btnLogin = document.querySelectorAll("#btn_login");
  btnLogin.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const usersRef = db.collection("users");
      const snapshot = await usersRef
        .where("username", "==", username)
        .where("password", "==", password)
        .get();
      if (snapshot.empty) {
        alert("Wrong Credentials");
        return;
      }
      location.href ="listTask.html";
    });
  });
});
