document.addEventListener("DOMContentLoaded", function () {
    // Работа аккордеонов
    const accordions = document.querySelectorAll('[data-el-type="accordion"]');
    if (accordions) {
        accordions.forEach((accordion) => {
            accordion.addEventListener('click', () => {
                if (accordion.classList.contains('show')) {
                    accordion.classList.remove('show');
                } else {
                    accordion.classList.add('show');
                }
            });
        });
    }

    // Работа с кастомными инпутами
    const customFormElements = new CustomFormElements();
    customFormElements.init();


    // Работа с менеджером загрузки товаров
    const productManager = new ProductManager({
        containerId: 'basket-items',
        apiEndpoint: '/api/get-products.php',
        renderEndpoint: '/api/render-products.php',
        storageKey: 'products_data',
        cacheDuration: 3600 * 1000
    });
    productManager.init();
    window.productManager = productManager;



    // Работа с менеджером корзины
    const basketManager = new BasketManager({
        storageKey: 'products_data',
        onUpdateCallback: (items) => {
            console.log(`[CartManager] Корзина обновлена, товаров: ${items.length}`);
        }
    });
    basketManager.init();
    window.basketManager = BasketManager;
})





