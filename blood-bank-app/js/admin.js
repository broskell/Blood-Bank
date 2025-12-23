// js/admin.js

// Firebase is already initialized in admin_panel.html

const adminAuth = firebase.auth();
const adminDb = firebase.firestore();

// ================== UI HELPERS ==================

function showAdminLogin() {
  const loginDiv = document.getElementById('adminLoginDiv');
  const dashDiv = document.getElementById('adminDashboardDiv');
  if (loginDiv) loginDiv.style.display = 'block';
  if (dashDiv) dashDiv.style.display = 'none';
}

function showAdminDashboard() {
  const loginDiv = document.getElementById('adminLoginDiv');
  const dashDiv = document.getElementById('adminDashboardDiv');
  if (loginDiv) loginDiv.style.display = 'none';
  if (dashDiv) dashDiv.style.display = 'block';

  // Default section: inventory
  hideAdminSections();
  const invSection = document.getElementById('inventorySection');
  if (invSection) invSection.style.display = 'block';
  loadInventory();
}

function hideAdminSections() {
  const invSection = document.getElementById('inventorySection');
  const reqSection = document.getElementById('adminRequestsSection');
  if (invSection) invSection.style.display = 'none';
  if (reqSection) reqSection.style.display = 'none';
}

function showAdminSection(sectionId) {
  hideAdminSections();
  const section = document.getElementById(sectionId);
  if (section) section.style.display = 'block';

  if (sectionId === 'inventorySection') {
    loadInventory();
  } else if (sectionId === 'adminRequestsSection') {
    loadAllRequestsAdmin();
  }
}

// ================== AUTHENTICATION ==================

function adminLogin() {
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;

  if (!email || !password) {
    alert('Please enter email and password.');
    return;
  }

  adminAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('adminPassword').value = '';
    })
    .catch(error => {
      console.error('Admin login error:', error);
      alert('Login failed: ' + error.message);
    });
}

function adminLogout() {
  adminAuth.signOut().catch(error => {
    console.error('Admin logout error:', error);
    alert('Logout failed: ' + error.message);
  });
}

// Listen for login state
adminAuth.onAuthStateChanged(user => {
  if (user) {
    showAdminDashboard();
  } else {
    showAdminLogin();
  }
});

// ================== CARD NAVIGATION ==================

document.addEventListener('DOMContentLoaded', function () {
  const invCard = document.getElementById('invCard');
  const reqCard = document.getElementById('reqCard');

  if (invCard) {
    invCard.addEventListener('click', () => showAdminSection('inventorySection'));
  }
  if (reqCard) {
    reqCard.addEventListener('click', () => showAdminSection('adminRequestsSection'));
  }
});

// ================== INVENTORY MANAGEMENT ==================

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

function loadInventory() {
  const container = document.getElementById('inventoryTableContainer');
  if (!container) return;

  container.innerHTML = '<p>Loading inventory...</p>';

  adminDb
    .collection('inventory')
    .get()
    .then(snapshot => {
      const inventoryMap = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        const group = data.group || doc.id;
        inventoryMap[group] = data.units || 0;
      });

      let rows = '';
      BLOOD_GROUPS.forEach(group => {
        const units = inventoryMap[group] || 0;
        rows += `
          <tr>
            <td>${group}</td>
            <td>
              <input
                type="number"
                min="0"
                class="inv-units-input"
                value="${units}"
                data-group="${group}"
              />
            </td>
            <td>
              <button type="button"
                      class="inv-save-btn"
                      data-group="${group}">
                Save
              </button>
            </td>
          </tr>
        `;
      });

      container.innerHTML = `
        <table class="admin-inventory-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Available Units</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      `;

      // Attach click listeners to all "Save" buttons
      const saveButtons = container.querySelectorAll('.inv-save-btn');
      saveButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const group = this.getAttribute('data-group');
          const input = container.querySelector(`input[data-group="${group}"]`);
          let units = parseInt(input.value, 10);
          if (isNaN(units) || units < 0) {
            alert('Units must be a non-negative number.');
            return;
          }
          saveInventory(group, units);
        });
      });
    })
    .catch(error => {
      console.error('Error loading inventory:', error);
      container.innerHTML = '<p>Error loading inventory.</p>';
    });
}

function saveInventory(group, units) {
  adminDb
    .collection('inventory')
    .doc(group)
    .set(
      {
        group: group,
        units: units
      },
      { merge: true }
    )
    .then(() => {
      alert(`Inventory updated for ${group}: ${units} units.`);
    })
    .catch(error => {
      console.error('Error saving inventory:', error);
      alert('Error updating inventory: ' + error.message);
    });
}

// ================== REQUEST MANAGEMENT ==================

function loadAllRequestsAdmin() {
  const listDiv = document.getElementById('adminRequestList');
  if (!listDiv) return;

  listDiv.innerHTML = '<p>Loading requests...</p>';

  adminDb
    .collection('blood_requests')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        listDiv.innerHTML = '<p>No requests found.</p>';
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
        const id = doc.id;
        const created = data.createdAt
          ? data.createdAt.toDate().toLocaleString()
          : 'Unknown time';
        const status = data.status || 'Pending';

        html += `
          <div class="request-item">
            <div class="request-item-header">
              <span>${data.bloodGroup} - ${data.units} units</span>
              <span class="status-badge status-${status.toLowerCase()}">${status}</span>
            </div>
            <div class="request-meta">
              Hospital: ${data.hospitalEmail || 'Unknown'}
            </div>
            <div class="request-meta">
              Reason: ${data.reason || 'N/A'}
            </div>
            <div class="request-meta">
              Requested at: ${created}
            </div>
            <div class="admin-request-actions">
              <span>Change status:</span>
              <select id="status-${id}">
                <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Approved" ${status === 'Approved' ? 'selected' : ''}>Approved</option>
                <option value="Rejected" ${status === 'Rejected' ? 'selected' : ''}>Rejected</option>
              </select>
              <button type="button" class="admin-update-btn" data-id="${id}">
                Update
              </button>
            </div>
          </div>
        `;
      });

      listDiv.innerHTML = html;

      // Attach listeners to "Update" buttons
      const updateButtons = listDiv.querySelectorAll('.admin-update-btn');
      updateButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          const select = document.getElementById(`status-${id}`);
          const newStatus = select.value;
          updateRequestStatus(id, newStatus);
        });
      });
    })
    .catch(error => {
      console.error('Error loading requests (admin):', error);
      listDiv.innerHTML = '<p>Error loading requests.</p>';
    });
}

function updateRequestStatus(requestId, newStatus) {
  adminDb
    .collection('blood_requests')
    .doc(requestId)
    .update({ status: newStatus })
    .then(() => {
      alert('Request status updated to ' + newStatus);
      loadAllRequestsAdmin();
    })
    .catch(error => {
      console.error('Error updating request status:', error);
      alert('Error updating status: ' + error.message);
    });
}