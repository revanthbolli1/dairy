document.addEventListener("DOMContentLoaded", function(){
    const searchInput = document.getElementById("search-input");
    const cards = document.querySelectorAll(".customer-card");
    const openModalBtns = document.querySelectorAll(".delete-customer");
    const modal = document.getElementById("myModal");
    const closeModalBtn = document.getElementById("close");
    const cancel = document.getElementById("ccancel");
    const deletebtn = document.getElementById("cdelete");
    const errormsg = document.getElementById("errormsg");
    const password = document.getElementById("cinput");
    const failmsg = document.getElementsByClassName("failure")[0];
    const succmsg = document.getElementsByClassName("success")[0];

    
    password.value = "";
    errormsg.style.display = "none";

    // Search button click event handler
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const customerName = card.querySelector(".name").textContent.toLowerCase();
            const customerid = card.querySelector(".id").textContent.toLowerCase();

            if (customerName.includes(searchQuery) || customerid.includes(searchQuery)) {
                card.style.display = "block"; 
            } 
            else {
                card.style.display = "none";  
            }
        });
    });
        
    window.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
            cards.forEach(function(c) {
                c.style.backgroundColor = 'rgb(227, 218, 218)'; 
                errormsg.style.display = "none";
                password.value = "";
            });
        }
    });

    function toggleCardColor(ele) {
        cards.forEach(function(c) {
            c.style.backgroundColor = 'rgb(227, 218, 218)'; 
        });
        ele.style.backgroundColor = 'red';
    }   

    openModalBtns.forEach(function(Btn) {
        Btn.addEventListener('click', function(event) {
            const card = Btn.parentElement;

            const hidden_id = document.getElementById("hidden-id");

            const village = card.getElementsByClassName("village")[0];
            const phone = card.getElementsByClassName("phone")[0];
            const number = card.getElementsByClassName("id")[0];
            const name = card.getElementsByClassName("name")[0];

            const cname = document.getElementById("cname");
            const cphone = document.getElementById("cphone");
            const cnumber = document.getElementById("cnumber");
            const cvillage = document.getElementById("cvillage");
            event.preventDefault();
            toggleCardColor(card);

            cname.innerText = name.textContent;
            cphone.innerText = phone.textContent;
            cnumber.innerText = number.textContent;
            cvillage.innerText = village.textContent;
            hidden_id.value = number.textContent.slice(8);

            modal.style.display="block";
        });
    });

    cancel.addEventListener("click", () => {
        modal.style.display = "none";
        cards.forEach(function(c) {
            c.style.backgroundColor = 'rgb(227, 218, 218)'; 
            errormsg.style.display = "none";
            password.value = "";  
        });
    });
    
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        cards.forEach(function(c) {
            c.style.backgroundColor = 'rgb(227, 218, 218)'; 
            errormsg.style.display = "none";
            password.value = "";
        });
    });

    deletebtn.addEventListener("click",function(event){
    const form = document.getElementById("cform");
    if(password.value===""){
        errormsg.innerText="Please enter Password!"
        errormsg.style.display="block";
    }
    else{
        form.submit();
    }
    password.addEventListener("input", ()=> errormsg.style.display = "none")
    });

    if(failmsg.innerText!==""){
        failmsg.style.display="block";
        setTimeout(()=> {failmsg.style.display ="none"}
        ,3000);
    }
    if(succmsg.innerText!==""){
        succmsg.style.display="block";
        setTimeout(()=> succmsg.style.display ="none",3000);
    }

})
