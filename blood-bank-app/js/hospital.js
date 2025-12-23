// js/hospital.js

// Firebase is already initialized in hospital_portal.html

const auth = firebase.auth();
const db = firebase.firestore();

// ========== UI HELPERS ==========

function showLogin() {
  document.getElementById('loginDiv').style.display = 'block';
  document.getElementById('registerDiv').style.display = 'none';
  document.getElementById('dashboardDiv').style.display = 'none';
}

function showRegister() {
  document.getElementById('loginDiv').style.display = 'none';
  document.getElementById('registerDiv').style.display = 'block';
  document.getElementById('dashboardDiv').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginDiv').style.display = 'none';
  document.getElementById('registerDiv').style.display = 'none';
  document.getElementById('dashboardDiv').style.display = 'block';

  hideAllSections();
  document.getElementById('requestSection').style.display = 'block';
}

function hideAllSections() {
  document.getElementById('requestSection').style.display = 'none';
  document.getElementById('statusSection').style.display = 'none';
  document.getElementById('availabilitySection').style.display = 'none';
}

function showSection(sectionId) {
  hideAllSections();
  document.getElementById(sectionId).style.display = 'block';

  if (sectionId === 'statusSection') {
    loadRequests();
  } else if (sectionId === 'availabilitySection') {
    loadAvailability();
  }
}

// ========== AUTHENTICATION ==========

function login() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Please enter email and password.');
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('loginPassword').value = '';
    })
    .catch(error => {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
    });
}

function register() {
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!email || !password) {
    alert('Please enter email and password.');
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // Optional: create hospital profile
      return db.collection('hospitals').doc(cred.user.uid).set({
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert('Hospital registered successfully. You are now logged in.');
      document.getElementById('regPassword').value = '';
    })
    .catch(error => {
      console.error('Register error:', error);
      alert('Registration failed: ' + error.message);
    });
}

function logout() {
  auth.signOut().catch(error => {
    console.error('Logout error:', error);
    alert('Logout failed: ' + error.message);
  });
}

// On auth state change
auth.onAuthStateChanged(user => {
  if (user) {
    showDashboard();
  } else {
    showLogin();
  }
});

// ========== CARD NAVIGATION ==========

document.addEventListener('DOMContentLoaded', function () {
  const requestCard = document.getElementById('requestCard');
  const statusCard = document.getElementById('statusCard');
  const availabilityCard = document.getElementById('availabilityCard');

  if (requestCard) {
    requestCard.addEventListener('click', () => showSection('requestSection'));
  }
  if (statusCard) {
    statusCard.addEventListener('click', () => showSection('statusSection'));
  }
  if (availabilityCard) {
    availabilityCard.addEventListener('click', () => showSection('availabilitySection'));
  }
});

// ========== SUBMIT BLOOD REQUEST (blood_requests) ==========

function submitRequest() {
  const user = auth.currentUser;
  if (!user) {
    alert('Please login first.');
    return;
  }

  const bloodGroup = document.getElementById('reqBloodGroup').value.trim().toUpperCase();
  const unitsStr = document.getElementById('reqUnits').value;
  const reason = document.getElementById('reqReason').value.trim();

  if (!bloodGroup || !unitsStr) {
    alert('Please enter blood group and units needed.');
    return;
  }

  const units = parseInt(unitsStr, 10);
  if (isNaN(units) || units <= 0) {
    alert('Units must be a positive number.');
    return;
  }

  db.collection('blood_requests')
    .add({
      hospitalId: user.uid,
      hospitalEmail: user.email,
      bloodGroup: bloodGroup,
      units: units,
      reason: reason,
      status: 'Pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert('Request submitted successfully.');
      document.getElementById('reqBloodGroup').value = '';
      document.getElementById('reqUnits').value = '';
      document.getElementById('reqReason').value = '';
    })
    .catch(error => {
      console.error('Error submitting request:', error);
      alert('Could not submit request: ' + error.message);
    });
}

// ========== LOAD HOSPITAL REQUESTS (status) ==========

function loadRequests() {
  const user = auth.currentUser;
  const listDiv = document.getElementById('requestList');

  if (!user) {
    listDiv.innerHTML = '<p>Please login to see your requests.</p>';
    return;
  }

  listDiv.innerHTML = '<p>Loading...</p>';

  db.collection('blood_requests')
    .where('hospitalId', '==', user.uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        listDiv.innerHTML = '<p>No requests submitted yet.</p>';
        return;
      }

      const docs = snapshot.docs.sort((a, b) => {
        const da = a.data().createdAt ? a.data().createdAt.toMillis() : 0;
        const dbt = b.data().createdAt ? b.data().createdAt.toMillis() : 0;
        return dbt - da;
      });

      let html = '';
      docs.forEach(doc => {
        const data = doc.data();
        const created =
          data.createdAt ? data.createdAt.toDate().toLocaleString() : 'Unknown time';
        const status = data.status || 'Pending';

        html += `
          <div class="request-item">
            <div class="request-item-header">
              <span>${data.bloodGroup} - ${data.units} units</span>
              <span class="status-badge status-${status.toLowerCase()}">${status}</span>
            </div>
            <div class="request-meta">Reason: ${data.reason || 'N/A'}</div>
            <div class="request-meta">Requested at: ${created}</div>
          </div>
        `;
      });

      listDiv.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading requests:', error);
      listDiv.innerHTML = '<p>Error loading requests.</p>';
    });
}

// ========== LOAD BLOOD AVAILABILITY (inventory) ==========

function getStatusFromUnits(units) {
  if (units === 0) return { label: 'Critical', className: 'status-critical' };
  if (units > 0 && units <= 4) return { label: 'Low', className: 'status-low' };
  return { label: 'OK', className: 'status-ok' };
}

function loadAvailability() {
  const listDiv = document.getElementById('availabilityList');
  listDiv.innerHTML = '<p>Loading...</p>';

  db.collection('inventory')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        listDiv.innerHTML = '<p>No inventory data found.</p>';
        return;
      }

      let rows = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const group = data.group || doc.id;
        const units = data.units || 0;
        const statusInfo = getStatusFromUnits(units);

        rows += `
          <tr>
            <td>${group}</td>
            <td>${units}</td>
            <td class="${statusInfo.className}">${statusInfo.label}</td>
          </tr>
        `;
      });

      listDiv.innerHTML = `
        <table class="availability-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Available Units</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      `;
    })
    .catch(error => {
      console.error('Error loading availability:', error);
      listDiv.innerHTML = '<p>Error loading availability.</p>';
    });
}