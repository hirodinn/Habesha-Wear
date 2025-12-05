// Category filter functionality for shop page
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Check URL parameter for initial category
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');


    if (initialCategory) {
        filterProducts(initialCategory);
        // Update active button
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === initialCategory) {
                btn.classList.add('active');
            }
        });
    } else {
        // Default: show women's products since that's the active button
        filterProducts('women');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.dataset.category;

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
});

console.log('Habesha Wear - Shop filter loaded successfully');
