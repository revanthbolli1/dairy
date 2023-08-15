document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const customerCards = document.querySelector(".customer-cards");

    // Search button click event handler
    searchInput.addEventListener("input", () => {
        const searchQuery = searchInput.value.toLowerCase();
        const cards = customerCards.querySelectorAll(".customer-card");

        cards.forEach(card => {
            const customerName = card.querySelector("h2").textContent.toLowerCase();
            const customerPhone = card.querySelector(".phone").textContent.toLowerCase();

            if (customerName.includes(searchQuery) || customerPhone.includes(searchQuery)) {
                card.style.display = "block"; // Show matching cards
            } else {
                card.style.display = "none";  // Hide non-matching cards
            }
        });
    });
});