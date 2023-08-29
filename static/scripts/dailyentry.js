document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const miniModal = document.getElementById('mini-modal');
    const confirmClsBtn = document.querySelector('.confirm-close')
    const form = document.getElementById('form');
    const confirm_submit = document.getElementById('confirm_button');
    const sbtBtn =document.getElementsByClassName("submit_button")[0];
    const sucbanner = document.getElementById("success");
    const editBtn = document.getElementById("cancel_button");
    const entryMsg=document.getElementById("entry");
    if(entryMsg.innerText!==""){
        entryMsg.style.display = "block";
        setTimeout(() => {
            entryMsg.style.display = "none";
        }, 3000);
    }

    function shiftData(card) {
        const cname = card.getAttribute('card_name');
        const phone = card.getAttribute('card_phone');
        const village = card.getAttribute('card_village');
        const id = card.getAttribute('card_id');
        const entry_name =document.getElementById('entry_name');
        const entry_phone=document.getElementById('entry_phone');
        const entry_village=document.getElementById('entry_village');
        const entry_id = document.getElementById('entry_id');
        const entry_id_hidden = document.getElementById('entry_id_hidden');
        const confirm_name = document.getElementById('confirm_name');
        const confirm_phone = document.getElementById('confirm_phone');
        const confirm_village = document.getElementById('confirm_village');
        const confirm_id = document.getElementById('confirm_id');

        entry_name.value = cname;
        entry_phone.value = phone;
        entry_village.value = village;
        entry_id.value = id;
        entry_id_hidden.value = id;
        confirm_name.value = cname;
        confirm_phone.value = phone;
        confirm_village.value = village;
        confirm_id.value = id;
    }

    function clearFields() {
        document.getElementById('milkDate').value = '';
        document.getElementById('amRadio').checked = false;
        document.getElementById('pmRadio').checked = false;
        document.getElementById('fat').value = '';
        document.getElementById('snf').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('total').value = '';
    }

    function bannerMsg(message){
        sucbanner.innerText=message;
        sucbanner.style.display = "block";
        setTimeout(() => {
            sucbanner.style.display = "none";
        }, 3000);
    }

    sbtBtn.addEventListener('click', function(){
        const date_error = document.getElementById("date-error");
        const time_error = document.getElementById("time-error");
        const fat_error = document.getElementById("fat-error");
        const snf_error = document.getElementById("snf-error");
        const quantity_error = document.getElementById("quantity-error");
        const total_error = document.getElementById("total-error");
        const date = document.getElementById("milkDate");
        const time= document.querySelector('input[name="am_pm"]:checked');
        const fat =document.getElementById('fat');
        const snf = document.getElementById('snf');
        const quantity = document.getElementById('quantity');
        const total = document.getElementById('total');
        const entry_id_hidden = document.getElementById('entry_id_hidden');
        const confirm_fat = document.getElementById('confirm-fat');
        const confirm_date=document.getElementById('confirm-date');
        const confirm_snf=document.getElementById('confirm-snf');
        const confirm_quantity=document.getElementById('confirm-quantity');
        const confirm_total=document.getElementById('confirm-total');
        count = 0;
        date_error.innerText="";
        fat_error.innerText="";
        time_error.innerText="";
        snf_error.innerText="";
        quantity_error.innerText="";
        total_error.innerText=""
        bannerMsg("");
        sucbanner.style.display="none";
        if (entry_id_hidden.value!==""){
            count +=1;
        }
        else{
            bannerMsg("<===  Please select customer on left!")
        }
        if(date.value!==""){
            count +=1;
        }
        else{
            date_error.innerText="Please select date!"
        }
        if(time){
            count +=1;
        }
        else{
            time_error.innerText="Please select time!"
        }
        if(fat.value !==""){
            count +=1;
        }
        else{
            fat_error.innerText="Please enter FAT!"
        }
        if(snf.value !==""){
            count +=1;
        }
        else{
            snf_error.innerText="Please enter SNF!"
        }
        if(quantity.value!==""){
            count +=1;
        }
        else{
            quantity_error.innerText="Please enter milk Quantity!"
        }
        if(total.value !==""){
            count +=1;
        }
        else{
            total_error.innerText = "Please enter total amount!"
        }
        if(count===7){
            miniModal.style.display="flex";
            date_error.innerText="";
            time_error.innerText="";
            fat_error.innerText="";
            snf_error.innerText="";
            quantity_error.innerText="";
            total_error.innerText="";

        }
        const parts = date.value.split('-');
        const display_date = `${parts[2]}-${parts[1]}-${parts[0]}`
        confirm_date.value= display_date+" ("+time.value+")";
        confirm_fat.value=fat.value;
        confirm_snf.value=snf.value;
        confirm_quantity.value=quantity.value;
        confirm_total.value=total.value;
        
    });

    confirm_submit.addEventListener("click",()=> form.submit());


    confirmClsBtn.addEventListener('click', function() {
        miniModal.style.display = 'none';
    });

    editBtn.addEventListener('click',function(){
        miniModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === miniModal) {
            miniModal.style.display = 'none';
        }
    });
    


    const searchInput = document.getElementById("search-input");
    const customerCards = document.querySelector(".customer-cards");
    // Search button click event handler
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        const cards = customerCards.querySelectorAll(".customer-card");

        cards.forEach(card => {
            const customerName = card.querySelector(".name").textContent.toLowerCase();
            const customerid = card.querySelector(".id").textContent.toLowerCase();

            if (customerName.includes(searchQuery) || customerid.includes(searchQuery)) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none";  
            }
        });
    });

    const cards = document.querySelectorAll('.customer-card');
    function toggleCardColor(card) {
        cards.forEach(function(c) {
            c.style.backgroundColor = 'rgb(227, 218, 218)'; 
        });
        card.style.backgroundColor = 'lightgreen';
    }
    
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            toggleCardColor(card)
            shiftData(card);
        });
    });
});