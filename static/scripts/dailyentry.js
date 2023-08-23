document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const miniModal = document.getElementById('mini-modal')
    const form = document.getElementById('form')
    const sbtBtn =document.getElementsByClassName("submit_button")[0]
    function shiftData(card) {
        const name = card.getAttribute('card_name');
        const phone = card.getAttribute('card_phone');
        const village = card.getAttribute('card_village');
        const id = card.getAttribute('card_id');

        document.getElementById('entry_name').value = name;
        document.getElementById('entry_phone').value = phone;
        document.getElementById('entry_village').value = village;
        document.getElementById('entry_id').value = id;
        document.getElementById('entry_id_hidden').value = id;

        sbtBtn.addEventListener('click', function(){
            miniModal.style.display="flex";
            const confirmClsBtn = document.querySelector('.confirm-close')
            const date = document.getElementById("milkDate").value;
            const amtime = document.getElementById('amRadio');
            const pmtime = document.getElementById('pmRadio');
            if (amtime.checked){
                const time = amtime.value;
            }
            const time = pmtime.value;
            const fat =document.getElementById('fat').value;
            const snf = document.getElementById('snf').value;
            const quantity = document.getElementById('quantity').value;
            const total = document.getElementById('total').value;
            
    
            document.getElementById('confirm_name').value = name;
            document.getElementById('confirm_phone').value = phone;
            document.getElementById('confirm_village').value = village;
            document.getElementById('confirm_id').value = id;
            document.getElementById('confirm_fat').value = fat;
            document.getElementById('confirm_date').value = date + " "+time;
            document.getElementById('confirm_snf').value =snf;
            document.getElementById('confirm_quantity').value = quantity;
            document.getElementById('confirm_total').value = total;
            miniModal.style.zIndex="4";
        });

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
                card.style.display = "block"; // Show matching cards
            } else {
                card.style.display = "none";  // Hide non-matching cards
            }
        });
    });

    const cards = document.querySelectorAll('.customer-card');
    function toggleCardColor(card) {
         // Assuming you have a class 'card' for each card
        cards.forEach(function(c) {
            c.style.backgroundColor = 'rgb(227, 218, 218)'; // Reset background color for all cards
        });
        card.style.backgroundColor = 'lightgreen'; // Set background color of clicked card to green
    }
    
    // Attach openModal function to all cards
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            toggleCardColor(card)
            shiftData(card);
        });
    });
});

