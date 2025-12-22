// js/app.js

// ----------------------------
// 1. Sample data (FR-HOME-1)
// ----------------------------
// This array acts like a small "in-memory database" of blood units.
// Later, in a real system, this data would come from the backend/database.
const bloodInventory = [
    { group: 'A+',  units: 12 },
    { group: 'A-',  units: 4  },
    { group: 'B+',  units: 8  },
    { group: 'B-',  units: 2  },
    { group: 'O+',  units: 15 },
    { group: 'O-',  units: 1  },
    { group: 'AB+', units: 6  },
    { group: 'AB-', units: 0  }
];

// -----------------------------------------
// 2. Decide status based on units available
//    (used for FR-HOME-1 display logic)
// -----------------------------------------
function getStatus(units) {
    // You can adjust these thresholds if you want.
    if (units === 0) {
        return { label: 'Critical', className: 'status-critical' };
    } else if (units > 0 && units <= 4) {
        return { label: 'Low', className: 'status-low' };
    } else {
        return { label: 'OK', className: 'status-ok' };
    }
}

// ---------------------------------------------------------
// 3. Render the availability table (supports FR-HOME-1 & 3)
// ---------------------------------------------------------
function renderAvailabilityTable(filterGroup = 'ALL') {
    const tbody = document.getElementById('availability-table-body');
    if (!tbody) {
        // Safety check: if HTML id is missing, do nothing.
        return;
    }

    // Clear any existing rows
    tbody.innerHTML = '';

    // Filter data based on selected blood group
    const filteredData = bloodInventory.filter(item => {
        return filterGroup === 'ALL' || item.group === filterGroup;
    });

    // Create table rows from data
    filteredData.forEach(item => {
        const row = document.createElement('tr');

        const groupCell = document.createElement('td');
        groupCell.textContent = item.group;

        const unitsCell = document.createElement('td');
        unitsCell.textContent = item.units;

        const statusCell = document.createElement('td');
        const statusInfo = getStatus(item.units);
        statusCell.textContent = statusInfo.label;
        statusCell.classList.add(statusInfo.className);

        row.appendChild(groupCell);
        row.appendChild(unitsCell);
        row.appendChild(statusCell);

        tbody.appendChild(row);
    });
}

// ----------------------------------------------------------------
// 4. Initialize page: render table and set up filter events (FRs)
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // a) Initial render for full table (FR-HOME-1)
    renderAvailabilityTable('ALL');

    // b) Set up change listener for filter dropdown (FR-HOME-3)
    const filterSelect = document.getElementById('bloodGroupFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function (event) {
            const selectedGroup = event.target.value;
            renderAvailabilityTable(selectedGroup);
        });
    }
});