document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementsByClassName("input")[0];
    const password = document.getElementsByClassName("input")[1]
    const form = document.querySelector('form');

    const errorMsg = (ele, msg)=>{
        const control=ele.parentElement;
        const errortxt=control.querySelector(".error");
        errortxt.innerText=msg;
        control.classList.add("error");
        control.classList.remove('success');
    };
    
    const successMsg = ele=>{
        const control=ele.parentElement;
        const errortxt=control.querySelector(".error");
        errortxt.innerText="";
        control.classList.add("success");
        control.classList.remove('error')
    }
    
    const isValidEmail = email =>{
        const rex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return rex.test(String(email).toLowerCase());
    }
    const validateLogin =()=>{ 
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        let count=0;
        
    
        if(emailValue===""){
            errorMsg(email,"*Email is required");
        }
        else if(!isValidEmail(emailValue)){
            errorMsg(email,"*Provide a valid email address");
        }
        else{
            successMsg(email);
            count +=1;
        }
    
        if(passwordValue=== ""){
            errorMsg(password,"*Password is required");
        }
        else if(passwordValue.length < 4){
            errorMsg(password,"*Password must be atleast 4 characters")
        }
        else{
            successMsg(password);
            count+=1;
        }
    
        if(count===2){
            form.submit();
        }
    }

    form.addEventListener('submit', e=>{
        e.preventDefault();
        validateLogin(); 
    });
    
});





