document.addEventListener('DOMContentLoaded', function() {
    const old_pass = document.getElementsByClassName("input")[0];
    const new_pass = document.getElementsByClassName("input")[1];
    const re_pass = document.getElementsByClassName("input")[2];
    const form = document.querySelector('form');

    const errorMsg = (ele, msg) => {
        const control = ele.parentElement;
        const errortxt = control.querySelector(".error");
        errortxt.innerText = msg;
        control.classList.add("error");
        control.classList.remove('success');
    };

    const successMsg = ele => {
        const control = ele.parentElement;
        const errortxt = control.querySelector(".error");
        errortxt.innerText = "";
        control.classList.add("success");
        control.classList.remove('error');
    };

    const validate = () => {
        const oldValue = old_pass.value.trim();
        const newValue = new_pass.value.trim();
        const reValue = re_pass.value.trim();
        let count = 0;

        if (oldValue === "") {
            errorMsg(old_pass, "*Old password required");
        } else if (oldValue.length < 4) {
            errorMsg(old_pass, "*Enter a valid password");
        } else {
            successMsg(old_pass);
            count += 1;
        }

        if (newValue === "") {
            errorMsg(new_pass, "*Password is required");
        } else if (newValue.length < 4) {
            errorMsg(new_pass, "*Password must be at least 4 characters");
        } else {
            successMsg(new_pass);
        }

        if (reValue !== newValue) {
            errorMsg(re_pass, "*Password doesn't match");
        } else {
            successMsg(re_pass);
            count += 1;
        }

        if (count === 2) {
            form.submit();
        }
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        validate();
    });
});
