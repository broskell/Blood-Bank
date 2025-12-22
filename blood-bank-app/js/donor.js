// js/donor.js
// Implements FR-DONOR-4 (validation) and FR-DONOR-5 (confirmation)

/**
 * Helper: clear all previous error messages
 */
function clearErrors() {
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach(span => {
        span.textContent = '';
    });
}

/**
 * Helper: show a general message at top of form
 */
function showFormMessage(type, message) {
    const formMessageDiv = document.getElementById('formMessage');
    if (!formMessageDiv) return;

    formMessageDiv.className = 'form-message ' + type; // 'success' or 'error'
    formMessageDiv.textContent = message;
}

/**
 * Validate the donor registration form fields (FR-DONOR-4)
 * Returns true if valid, false otherwise.
 */
function validateDonorForm() {
    clearErrors();
    showFormMessage('', ''); // clear general message

    let isValid = true;

    // Get form field values
    const fullName = document.getElementById('fullName').value.trim();
    const ageValue = document.getElementById('age').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const city = document.getElementById('city').value.trim();
    const bloodGroup = document.getElementById('bloodGroup').value;

    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const availabilityRadios = document.querySelectorAll('input[name="availability"]');
    const lastDonationDate = document.getElementById('lastDonationDate').value;

    // 1. Full Name (required)
    if (fullName === '') {
        document.getElementById('fullNameError').textContent = 'Full Name is required.';
        isValid = false;
    }

    // 2. Age (required, >=18)
    if (ageValue === '') {
        document.getElementById('ageError').textContent = 'Age is required.';
        isValid = false;
    } else {
        const age = parseInt(ageValue, 10);
        if (isNaN(age) || age < 18) {
            document.getElementById('ageError').textContent = 'Donor must be at least 18 years old.';
            isValid = false;
        }
    }

    // 3. Gender (required)
    let genderSelected = false;
    genderRadios.forEach(radio => {
        if (radio.checked) genderSelected = true;
    });
    if (!genderSelected) {
        document.getElementById('genderError').textContent = 'Please select your gender.';
        isValid = false;
    }

    // 4. Phone (required, digits only, length check)
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Phone number is required.';
        isValid = false;
    } else {
        const phoneDigitsOnly = /^\d+$/;
        if (!phoneDigitsOnly.test(phone)) {
            document.getElementById('phoneError').textContent = 'Phone number must contain digits only.';
            isValid = false;
        } else if (phone.length < 8 || phone.length > 15) {
            document.getElementById('phoneError').textContent = 'Phone number length seems invalid.';
            isValid = false;
        }
    }

    // 5. Email (optional but if filled, basic format check)
    if (email !== '') {
        const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicEmailPattern.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }
    }

    // 6. City (required)
    if (city === '') {
        document.getElementById('cityError').textContent = 'City is required.';
        isValid = false;
    }

    // 7. Blood Group (required)
    if (bloodGroup === '') {
        document.getElementById('bloodGroupError').textContent = 'Please select your blood group.';
        isValid = false;
    }

    // 8. Last Donation Date (optional, must not be future)
    if (lastDonationDate !== '') {
        const selectedDate = new Date(lastDonationDate);
        const today = new Date();
        // Remove time part for comparison:
        selectedDate.setHours(0,0,0,0);
        today.setHours(0,0,0,0);

        if (selectedDate > today) {
            document.getElementById('lastDonationDateError').textContent = 'Last donation date cannot be in the future.';
            isValid = false;
        }
    }

    // 9. Availability (required)
    let availabilitySelected = false;
    availabilityRadios.forEach(radio => {
        if (radio.checked) availabilitySelected = true;
    });
    if (!availabilitySelected) {
        document.getElementById('availabilityError').textContent = 'Please select your availability.';
        isValid = false;
    }

    return isValid;
}

/**
 * On page load, attach event listener to the form submit
 */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('donorRegistrationForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevent normal form submission

        const isValid = validateDonorForm();

        if (isValid) {
            // FR-DONOR-5: Show confirmation
            showFormMessage('success', 'Registration successful! (Demo mode: data not yet saved to server)');

            // For demonstration: log the data to console
            const formData = new FormData(form);
            const dataObject = {};
            formData.forEach((value, key) => {
                dataObject[key] = value;
            });
            console.log('Donor registration data:', dataObject);

            // Optionally, clear form fields:
            form.reset();
        } else {
            // Show general error message
            showFormMessage('error', 'Please correct the highlighted errors and submit again.');
        }
    });
});