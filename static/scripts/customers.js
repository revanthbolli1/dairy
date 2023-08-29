document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const customerCards = document.querySelector(".customers-cards");
    const cards = customerCards.querySelectorAll(".customer-card");
    // Search button click event handler
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        

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



        const openModalBtns = document.querySelectorAll(".view-entry");
        const responseContainer=document.getElementsByClassName("modal-contentss")[0];
        const modal = document.getElementById("myModal");
        window.addEventListener("click", event => {
            if (event.target === modal) {
                modal.style.display = "none";
                cards.forEach(function(c) {
                    c.style.backgroundColor = 'rgb(227, 218, 218)'; 
                });
            }
        });

        function toggleCardColor(ele) {
            cards.forEach(function(c) {
                c.style.backgroundColor = 'rgb(227, 218, 218)'; 
            });
            ele.style.backgroundColor = 'lightgreen';
        }

        openModalBtns.forEach(function(Btn) {
            Btn.addEventListener('click', function(event) {
                event.preventDefault();
                fetch(this.getAttribute("href"), {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    }
                })
                .then(response => response.json())
                .then((entries) => {
                    let entriesHtml = '';
                    entries[0].forEach(entry => {
                        entriesHtml += `
                            <div class="document-card">
                                <span>Date: ${entry.date.slice(0,16)}</span>
                                <span>Time: ${entry.time}</span>
                                <span>FAT: ${entry.fat}</span>
                                <span>SNF: ${entry.snf}</span>
                                <span>Litres: ${entry.quantity}</span>
                                <span>Total amount: ₹ ${entry.price}</span>
                            </div>
                        `;
                    });
                    const cpaid=document.getElementById("cpaid");
                    const cbusiness = document.getElementById("cbusiness");
                    const cpending = document.getElementById("cpending");
                    const cnumber = document.getElementById("cnumber");
                    cpaid.innerHTML=`Paid: ₹ ${entries[1]}`;
                    cbusiness.innerHTML=`Total Business: ₹ ${entries[3]}`;
                    cpending.innerHTML = `Pending Bill: ₹ ${entries[2]}`
                    cnumber.innerHTML=`Number: ${entries[4]}`
                    responseContainer.innerHTML = entriesHtml;
                    if(responseContainer.childNodes.length==0){
                        responseContainer.innerHTML+=`<h1 style="color:grey; font-size:60px; text-align:center; margin:23% 0px;">Empty</h1>`
                    }
                    const closeModalBtn = document.getElementById("close")
                    closeModalBtn.addEventListener("click", () => {
                        modal.style.display = "none";
                        cards.forEach(function(c) {
                            c.style.backgroundColor = 'rgb(227, 218, 218)'; 
                        });
                    });
                })
                .catch(error => console.error("Error:", error));
                modal.style.display="block";
                toggleCardColor(Btn.parentElement)
                
            });
        });

    
        
});


