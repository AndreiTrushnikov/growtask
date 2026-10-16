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

    // Работа с корзиной
    const basketUI = new BasketUI({
        counterSelector: '[data-el="items-counter"]',
    });
    basketUI.init();
    window.basketUI = basketUI;

    const basketManager = new BasketManager({
        storageKey: 'products_data',
        onInitCallback: () => {
            basketUI.updateCounter(basketManager.getCount());
        },
        onUpdateCallback: (items) => {
            basketUI.updateCounter(basketManager.getCount());
        },
    });
    basketManager.init();
    window.basketManager = basketManager;

    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-el]');
        if (!target) return;

        const card = e.target.closest('[data-el="basket-item"]');

        if (target.dataset.el === 'minus') {
            window.basketManager.decrement(+card.id);
            // TODO Обновить всю корзину, если совсем удалился товар или запретить удалять меньше 1
        } else if (target.dataset.el === 'plus') {
            window.basketManager.increment(+card.id);
        } else if (target.dataset.el === 'item-delete') {
            window.basketManager.remove(+card.id);
        }
    });
})





