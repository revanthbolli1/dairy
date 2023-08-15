document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');

    function openModal(card) {
        const name = card.getAttribute('card_name');
        const phone = card.getAttribute('card_phone');
        const village = card.getAttribute('card_village');

        document.getElementById('entry_name').value = name;
        document.getElementById('entry_phone').value = phone;
        document.getElementById('entry_village').value = village;

        modal.style.display = 'flex';
    }

    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Attach openModal function to all cards
    const cards = document.querySelectorAll('.customer-card');
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            openModal(card);
        });
    });
});

