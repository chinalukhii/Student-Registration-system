function validateForm(){

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const birthDateInput = document.getElementById('birthDate');

    const errorFirstName = document.getElementById('errorName');
    const errorLastName = document.getElementById('errorSurname');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorPhoneNumber = document.getElementById('errorNumber');
    const errorBirhtdate = document.getElementById('errorDate');
    const errorSummary = document.getElementById('errorSummary');

    
    const fieldRequired = document.getElementById('errors.the-field-is-required').innerText;
    const symbols2_60 = document.getElementById('errors.2-60-symbols').innerText;
    const symbols9 = document.getElementById('errors.9-symbols').innerText;
    const birthdateBiggerCurrent = document.getElementById('errors.birthdate-bigger-current').innerText;
    const dateShouldBeInFuture = document.getElementById('errors.date-should-be-in-future').innerText;
    const endDateAfterStartDate = document.getElementById('errors.end-date-after-start-date').innerText;
    const licenseIssue = document.getElementById('errors.course_date_lessthan_today').innerText;
    const validEmail = document.getElementById('errors.valid-email').innerText;
    const questionAddRecord = document.getElementById('errors.question-add-record').innerText;



    console.log("Before reset Errors");
    
    resetErrors([firstNameInput, lastNameInput, phoneNumberInput, birthDateInput, emailInput, passwordInput],
                [errorFirstName, errorLastName, errorPhoneNumber, errorBirhtdate, errorEmail, errorPassword]);


    console.log("AFter reset Errors");
    let valid = true;

    //validation for firstNameInput field
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = fieldRequired;
    }else if(!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = symbols2_60;
    }

    //validation for lastNameInput field
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = fieldRequired;
    }else if(!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = symbols2_60;
    }

    //validation for email field
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = fieldRequired;
    } else if (!checkEmailValid(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = validEmail;
    }

    //validation password
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = fieldRequired;
    }


    //validation for phoneNumberInput field
    if (!checkRequired(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = fieldRequired;
    }else if(!checkTextLengthRange(phoneNumberInput.value, 9, 9)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = symbols9;
    }
    //validation for birthDateInput before now
    if (!checkDateIfPast(birthDateInput.value)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirhtdate.innerText = birthdateBiggerCurrent;
    }

    //validation for birthDateInput field
    if (!checkRequired(birthDateInput.value)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirhtdate.innerText = fieldRequired;
    }

    if (valid) {             
        errorSummary.style.visibility = "hidden";
        const conf = confirm(questionAddRecord);
        return conf
    } else {
        errorSummary.style.visibility = "visible";
        return false;
    }

};









