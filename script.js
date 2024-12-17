document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.cards-container');
    const fileInput = document.getElementById('fileInput');
    let currentCard; // Track clicked card
    
    const emptyDays = 2; // Days before the 1st of the month (e.g., December starts on a Friday)
    const totalDays = 31;

    // Generate cards
    for (let i = 0; i < emptyDays; i++) {
        container.innerHTML += '<div></div>';
    }
    for (let day = 1; day <= totalDays; day++) {
        container.innerHTML += `<div class="card"><a>${day}</a></div>`;
    }

    // Add event listeners to cards
    container.addEventListener('click', (event) => {
        if (event.target.closest('.card')) {
            currentCard = event.target.closest('.card');
            fileInput.click(); // Open file input on card click
        }
    });
    
    // Handle file input selection
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && currentCard) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentCard.innerHTML = `<div class="card"><img src="${e.target.result}" alt="Uploaded Image"><a>${currentCard.querySelector('a').textContent}</a></div>`;
            };
            reader.readAsDataURL(file);
        }
        fileInput.value = ""; // Reset file input
    });
});