document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gymForm');
    
    // Form fields
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const duration = document.getElementById('duration');
    const membershipTotal = document.getElementById('membershipTotal');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Validation patterns
    const patterns = {
        fullName: /^[a-zA-Z\s]{3,}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        phone: /^\d{10}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ // Min 8 chars, 1 uppercase, 1 lowercase, 1 number
    };

    // Validation messages
    const messages = {
        fullName: 'Name must be at least 3 characters (letters & spaces only).',
        email: 'Please enter a valid email address.',
        phone: 'Phone number must be exactly 10 digits.',
        age: 'Age must be between 16 and 100.',
        duration: 'Please select a membership duration.',
        password: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number.',
        confirmPassword: 'Passwords do not match.'
    };

    // Generic validation function
    const validateField = (field, regex, customCheck = null) => {
        const errorElement = document.getElementById(`${field.id}Error`);
        const formGroup = field.parentElement;
        let isValid = false;

        if (customCheck) {
            isValid = customCheck(field.value);
        } else {
            isValid = regex.test(field.value.trim());
        }

        if (isValid) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            formGroup.classList.add('success');
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
            errorElement.textContent = messages[field.id];
            errorElement.classList.add('show');
            formGroup.classList.remove('success');
        }

        return isValid;
    };

    // Specific custom checks
    const checkAge = (value) => {
        const num = parseInt(value, 10);
        return !isNaN(num) && num >= 16 && num <= 100;
    };

    const checkDuration = (value) => {
        return ['1', '3', '6', '12'].includes(value);
    };

    const updateMembershipTotal = () => {
        const months = Number(duration.value);
        const durationPrices = { 1: 2000, 3: 4000, 6: 7000, 12: 18000 };
        const durationNames = { 1: '1 Month', 3: 'Quarterly', 6: 'Half-yearly', 12: 'Yearly' };
        const durationOptions = duration.querySelectorAll('option[value]');

        durationOptions.forEach((option) => {
            const optionMonths = Number(option.value);
            option.textContent = `${durationNames[optionMonths]} (₹${durationPrices[optionMonths].toLocaleString('en-IN')})`;
        });

        if (durationPrices[months]) {
            membershipTotal.textContent = `${durationNames[months]} membership fee: ₹${durationPrices[months].toLocaleString('en-IN')}.`;
        } else {
            membershipTotal.textContent = 'Select a duration to see the total.';
        }
    };

    const checkConfirmPassword = (value) => {
        return value !== '' && value === password.value;
    };

    // Event Listeners for live validation (input & blur)
    const setupListeners = (field, regex, customCheck = null) => {
        // Check while typing
        field.addEventListener('input', () => {
            // Only validate if they've started typing or already triggered an error
            if (field.value.length > 0 || field.classList.contains('invalid')) {
                validateField(field, regex, customCheck);
            }
            
            // Re-validate confirm password if password changes
            if (field.id === 'password' && confirmPassword.value.length > 0) {
                validateField(confirmPassword, null, checkConfirmPassword);
            }
        });

        // Check when leaving the field
        field.addEventListener('blur', () => {
            validateField(field, regex, customCheck);
        });
    };

    // Apply listeners to all fields
    setupListeners(fullName, patterns.fullName);
    setupListeners(email, patterns.email);
    setupListeners(phone, patterns.phone);
    setupListeners(age, null, checkAge);
    setupListeners(duration, null, checkDuration);
    setupListeners(password, patterns.password);
    setupListeners(confirmPassword, null, checkConfirmPassword);

    duration.addEventListener('change', updateMembershipTotal);
    updateMembershipTotal();

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields on submit
        const isNameValid = validateField(fullName, patterns.fullName);
        const isEmailValid = validateField(email, patterns.email);
        const isPhoneValid = validateField(phone, patterns.phone);
        const isAgeValid = validateField(age, null, checkAge);
        const isDurationValid = validateField(duration, null, checkDuration);
        const isPasswordValid = validateField(password, patterns.password);
        const isConfirmPasswordValid = validateField(confirmPassword, null, checkConfirmPassword);

        if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isDurationValid && isPasswordValid && isConfirmPasswordValid) {
            // Simulate successful submission
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';
            
            setTimeout(() => {
                alert('Application Submitted Successfully!');
                form.reset();
                
                // Reset visual states
                const inputs = form.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                    input.parentElement.classList.remove('success');
                });

                updateMembershipTotal();
                
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 1500);
        } else {
            // Focus first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
});
