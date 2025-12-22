// Firebase config (your project)
const firebaseConfig = {
  apiKey: "AIzaSyDO10D25fYkYgs8K0YQAT8hxoAHveYEDN0",
  authDomain: "blood-donation-bd2dc.firebaseapp.com",
  projectId: "blood-donation-bd2dc",
  storageBucket: "blood-donation-bd2dc.firebasestorage.app",
  messagingSenderId: "899939481372",
  appId: "1:899939481372:web:0e445e9b3a3ef6b01fecd9",
  measurementId: "G-N4CN4Z5Q14",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Auth DOM
const loginDiv = document.getElementById("loginDiv");
const registerDiv = document.getElementById("registerDiv");
const dashboardDiv = document.getElementById("dashboardDiv");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");

// Sections & cards
const requestCard = document.getElementById("requestCard");
const statusCard = document.getElementById("statusCard");
const availabilityCard = document.getElementById("availabilityCard");

const requestSection = document.getElementById("requestSection");
const statusSection = document.getElementById("statusSection");
const availabilitySection = document.getElementById("availabilitySection");

// Inputs for request
const reqBloodGroup = document.getElementById("reqBloodGroup");
const reqUnits = document.getElementById("reqUnits");
const reqReason = document.getElementById("reqReason");

// Lists
const requestList = document.getElementById("requestList");
const availabilityList = document.getElementById("availabilityList");

// Navigation between login/register
function showRegister() {
  loginDiv.style.display = "none";
  registerDiv.style.display = "block";
}

function showLogin() {
  registerDiv.style.display = "none";
  loginDiv.style.display = "block";
}

// Register hospital (email/password)
function register() {
  const email = regEmail.value.trim();
  const password = regPassword.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Registered successfully!");
      regEmail.value = "";
      regPassword.value = "";
      showLogin();
    })
    .catch((error) => {
      alert("Register Error: " + error.message);
    });
}

// Login
function login() {
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      loginDiv.style.display = "none";
      registerDiv.style.display = "none";
      dashboardDiv.style.display = "block";
      showSection(requestSection); // default section
      loadAvailability();
      loadRequests();
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
}

// Logout
function logout() {
  auth
    .signOut()
    .then(() => {
      dashboardDiv.style.display = "none";
      registerDiv.style.display = "none";
      loginDiv.style.display = "block";
      hideAllSections();
    })
    .catch((error) => {
      alert("Logout Error: " + error.message);
    });
}

// Section helpers
function hideAllSections() {
  requestSection.style.display = "none";
  statusSection.style.display = "none";
  availabilitySection.style.display = "none";
}

function showSection(section) {
  hideAllSections();
  section.style.display = "block";
  window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
}

// Card clicks
requestCard.addEventListener("click", () => showSection(requestSection)); // [web:59][web:61]
statusCard.addEventListener("click", () => {
  showSection(statusSection);
  loadRequests();
});
availabilityCard.addEventListener("click", () => {
  showSection(availabilitySection);
  loadAvailability();
});

// Submit blood request
function submitRequest() {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  const bloodGroup = reqBloodGroup.value.trim();
  const units = parseInt(reqUnits.value, 10);
  const reason = reqReason.value.trim();

  if (!bloodGroup || !units || units <= 0 || !reason) {
    alert("Please fill all fields correctly");
    return;
  }

  db.collection("bloodRequests")
    .add({
      uid: user.uid,
      email: user.email,
      bloodGroup,
      units,
      reason,
      status: "Pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      alert("Request submitted");
      reqBloodGroup.value = "";
      reqUnits.value = "";
      reqReason.value = "";
      loadRequests();
      showSection(statusSection);
    })
    .catch((error) => {
      alert("Error submitting request: " + error.message);
    });
}

// Load requests of this hospital
function loadRequests() {
  const user = auth.currentUser;
  if (!user) return;

  requestList.innerHTML = "<p>Loading...</p>";

  db.collection("bloodRequests")
    .where("uid", "==", user.uid)
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        requestList.innerHTML = "<p>No requests yet.</p>";
        return;
      }

      requestList.innerHTML = "";
      snapshot.forEach((doc) => {
        const r = doc.data();
        const created =
          r.createdAt && r.createdAt.toDate
            ? r.createdAt.toDate().toLocaleString()
            : "";
        requestList.innerHTML += `
          <div class="list-item">
            <strong>${r.bloodGroup}</strong> – ${r.units} units<br/>
            Status: <strong>${r.status}</strong><br/>
            Reason: ${r.reason}<br/>
            <small>${created}</small>
          </div>
        `;
      });
    })
    .catch((error) => {
      requestList.innerHTML =
        "<p>Error loading requests: " + error.message + "</p>";
    });
}

// Load availability (simple demo – reads from 'availability' collection)
function loadAvailability() {
  availabilityList.innerHTML = "<p>Loading...</p>";

  db.collection("availability")
    .orderBy("bloodGroup")
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        availabilityList.innerHTML =
          "<p>No availability data. Add documents in 'availability' collection.</p>";
        return;
      }

      availabilityList.innerHTML = "";
      snapshot.forEach((doc) => {
        const a = doc.data();
        availabilityList.innerHTML += `
          <div class="list-item">
            <strong>${a.bloodGroup}</strong> : ${a.units} units
          </div>
        `;
      });
    })
    .catch((error) => {
      availabilityList.innerHTML =
        "<p>Error loading availability: " + error.message + "</p>";
    });
}

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (user) {
    loginDiv.style.display = "none";
    registerDiv.style.display = "none";
    dashboardDiv.style.display = "block";
    showSection(requestSection);
    loadAvailability();
    loadRequests();
  } else {
    dashboardDiv.style.display = "none";
    registerDiv.style.display = "none";
    loginDiv.style.display = "block";
    hideAllSections();
  }
});
