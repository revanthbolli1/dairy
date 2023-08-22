document.addEventListener('DOMContentLoaded', function() {
    const username = document.getElementsByClassName("input")[0];
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
    

    const validateLogin =()=>{ 
        const userNameValue = username.value.trim();
        const passwordValue = password.value.trim();
        let count=0;
        
    
        if(userNameValue===""){
            errorMsg(username,"*Username is required");
        }
        else{
            successMsg(username);
            count +=1;
        }
    
        if(passwordValue=== ""){
            errorMsg(password,"*Password is required");
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





