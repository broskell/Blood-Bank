// js/app.js
// Third-party public API: Rootnet hospital beds by Indian state

const ROOTNET_URL = 'https://api.rootnet.in/covid19-in/hospitals/beds';

// Will hold list of states from API
let hospitalStateData = [];

// Render stats for a selected state
function renderStateStats(stateName) {
  const statsDiv = document.getElementById('stateStats');
  if (!statsDiv) return;

  if (!stateName) {
    statsDiv.innerHTML = '<p>Please select a state.</p>';
    return;
  }

  const record = hospitalStateData.find(item => item.state === stateName);
  if (!record) {
    statsDiv.innerHTML = '<p>No data found for this state.</p>';
    return;
  }

  statsDiv.innerHTML = `
    <h4>${record.state}</h4>
    <ul>
      <li><strong>Total Hospitals:</strong> ${record.totalHospitals}</li>
      <li><strong>Total Beds:</strong> ${record.totalBeds}</li>
      <li><strong>Rural Hospitals:</strong> ${record.ruralHospitals}</li>
      <li><strong>Rural Beds:</strong> ${record.ruralBeds}</li>
      <li><strong>Urban Hospitals:</strong> ${record.urbanHospitals}</li>
      <li><strong>Urban Beds:</strong> ${record.urbanBeds}</li>
    </ul>
  `;
}

// Load data from third-party public API and fill dropdown
async function loadPublicHospitalData() {
  const stateSelect = document.getElementById('stateSelect');
  const statsDiv = document.getElementById('stateStats');

  if (!stateSelect || !statsDiv) {
    console.error('stateSelect or stateStats element not found in DOM.');
    return;
  }

  // Set loading text
  stateSelect.innerHTML = '<option value="">Loading states...</option>';
  statsDiv.innerHTML = '<p>Loading public API data...</p>';

  try {
    const response = await fetch(ROOTNET_URL);
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }

    const json = await response.json();
    const regional = json?.data?.regional || [];
    if (!Array.isArray(regional) || regional.length === 0) {
      throw new Error('Unexpected API response format.');
    }

    // Map the data
    hospitalStateData = regional.map(item => ({
      state: item.state,
      ruralHospitals: item.ruralHospitals,
      ruralBeds: item.ruralBeds,
      urbanHospitals: item.urbanHospitals,
      urbanBeds: item.urbanBeds,
      totalHospitals: item.totalHospitals,
      totalBeds: item.totalBeds
    }));

    // Fill dropdown
    stateSelect.innerHTML = '<option value="">-- Select State --</option>';
    hospitalStateData.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.state;
      opt.textContent = item.state;
      stateSelect.appendChild(opt);
    });

    statsDiv.innerHTML = '<p>Please select a state to view details.</p>';
  } catch (error) {
    console.error('Error loading public API data:', error);
    statsDiv.innerHTML =
      '<p>Error loading data from public API. Please try again later.</p>';
    stateSelect.innerHTML =
      '<option value="">Error loading states</option>';
  }
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('app.js DOMContentLoaded: loading public API data...');
  loadPublicHospitalData();

  const stateSelect = document.getElementById('stateSelect');
  if (stateSelect) {
    stateSelect.addEventListener('change', function (event) {
      const stateName = event.target.value;
      renderStateStats(stateName);
    });
  }
});