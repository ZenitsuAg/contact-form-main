const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const query = document.querySelectorAll('input[name=query]')
const message = document.querySelector('#message')
const checkbox = document.querySelector('#checkbox')

const fnError = document.querySelector('#fnError')
const lnError = document.querySelector('#lnError')
const emailError = document.querySelector('#emailError')
const queryError = document.querySelector('#queryError')
const messageError = document.querySelector('#messageError')
const checkboxError = document.querySelector('#checkboxError')

const successMessage = document.querySelector('.successMsg')

document.querySelector('input[type=submit]').addEventListener("click", (e) => {
    e.preventDefault()
    const isFirstNameValid = validateElement(firstName, fnError)
    const isLastNameValid = validateElement(lastName, lnError)
    const isQueryValid = validateRadio(query, queryError)
    const isMessageValid = validateElement(message, messageError)
    const isCheckboxValid = validateCheckbox(checkbox, checkboxError)

    let isEmailValid = false
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (regex.test(email.value)) {
        console.log('Success');
        email.classList.remove('error-effect')
        emailError.style.display = 'none'
        isEmailValid = true
    } else {
        console.log("Failed");
        email.classList.add('error-effect')
        emailError.style.display = 'block'
    }

    if (isFirstNameValid && isLastNameValid && isEmailValid && 
        isQueryValid && isMessageValid && isCheckboxValid) {
        
        console.log("Form submitted successfully!")
        // Reset the form
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        query.forEach(q => {
            q.checked = false;
            q.parentElement.style.backgroundColor = 'white'
        })
        message.value = ''
        checkbox.checked = false
        
        //Show success message to user
        successMessage.style.display = 'block'
        successMessage.classList.add('anim')
        // successMessage.style.transition = 'display 1000ms linear'

        setTimeout(() => {
            successMessage.style.display = 'none'
        // successMessage.style.transition = 'display 1000ms linear'

        }, 5000);
    } else {
        console.log("Form has validation errors!")
    }
})

query.forEach(q => q.addEventListener('change', (e) => {
    console.log('Change event on:', q.value)
    
    // Reset all backgrounds first
    query.forEach(radio => {
        radio.parentElement.style.backgroundColor = 'white'
    })
    
    // Then set the checked one to light-green
    if (e.target.checked) {
        e.target.parentElement.style.backgroundColor = 'hsl(148, 38%, 91%)'
    }
}))

function handleChange(q){
    q.parentElement.style.backgroundColor = 'hsl(148, 38%, 91%)'
    if(!q.checked) {
        q.parentElement.style.backgroundColor = 'black'
    }
}

function validateElement(elem, elemErr) {
    if(!elem.value.trim()) {
        elem.classList.add('error-effect')
        elemErr.style.display = 'block'
        return false
    } else {
        elem.classList.remove('error-effect')
        elemErr.style.display = 'none'
        return true
    }
}

function validateCheckbox(check, checkErr) {
    if(!check.checked) {
        checkErr.style.display = 'block'
        return false
    } else {
        checkErr.style.display = 'none'
        return true
    }
}

function validateRadio(radio, radioError) {
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radioError.style.display = 'none'
            console.log(radio[i].value)
            return true
        }
    }
    radioError.style.display = 'block'
}

// function validateRadio(radioGroup, errorElement) {
//     const isChecked = Array.from(radioGroup).some(radio => radio.checked)
//     if (!isChecked) {
//         errorElement.style.display = 'block'
//         return false
//     } else {
//         errorElement.style.display = 'none'
//         return true
//     }
// }


