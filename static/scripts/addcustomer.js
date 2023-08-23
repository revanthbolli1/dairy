const profilePicInput = document.getElementById('profile-pic-input');
const profilePic = document.getElementById('profile-pic');

profilePicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    profilePic.src = imageUrl;
});

const form = document.getElementById('profile-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const villageInput = document.getElementById('village');
const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');
const villageError = document.getElementById('village-error');
const sucbanner = document.getElementById("success");
if (sucbanner.innerText===""){
    sucbanner.style.display="none";
}
else{
    sucbanner.style.display="block";
}
form.addEventListener('submit', (event) => {
    let count = 0;
    event.preventDefault();
    count = validateNameInput(nameInput, nameError, count);
    count = validatePhoneInput(phoneInput, phoneError,count);
    count = validateVillageInput(villageInput, villageError, count)
    if (count === 3){
        form.submit();
    }
});

function validateNameInput(input, errorElement, count) {
    if (input.value.trim() === '') {
        errorMessage = "Name is required!";
        errorElement.previousElementSibling.style.borderBottomColor = "red"
    } else if(input.value.trim().length < 4){
        errorMessage = 'Name must have atleast 4 characters!'
        errorElement.previousElementSibling.style.borderBottomColor = "red"
    }
    else{
        count++;
        errorMessage = '';
        errorElement.previousElementSibling.style.borderBottomColor= "rgb(5, 219, 16)"
    }
    errorElement.textContent = errorMessage
    return count
}

function validatePhoneInput(input, errorElement,count) {
    const phoneNumberPattern = /^\d{10}$/;
    if (input.value.trim() === '') {
        errorMessage = "Phone number is required!"
        errorElement.previousElementSibling.style.borderBottomColor = "red"
    }
    else if (!phoneNumberPattern.test(input.value.trim())) {
        errorMessage = "Enter a valid Phone Number!";
        errorElement.previousElementSibling.style.borderBottomColor = "red"
    }
    else{
        count ++
        errorMessage="";
        errorElement.previousElementSibling.style.borderBottomColor= "rgb(5, 219, 16)"
    }
    errorElement.textContent = errorMessage
    return count
}


function validateVillageInput(input, errorElement, count) {
    if (input.value.trim() === '') {
        errorMessage = "Village is required!";
        errorElement.previousElementSibling.style.borderBottomColor = "red"
    } else if(input.value.trim().length < 4){
        errorMessage = 'Village name must have atleast 4 characters!'
        errorElement.previousElementSibling.style.borderBottomColor = "red"
    }
    else{
        count++;
        errorMessage = '';
        errorElement.previousElementSibling.style.borderBottomColor= "rgb(5, 219, 16)"
    }
    errorElement.textContent = errorMessage
    return count
}