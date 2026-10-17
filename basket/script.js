document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем прелоадер
    const preloader = new Preloader();
    preloader.init();

    // Инстанс менеджера по работе с DOM корзины
    const basketUI = new BasketUI({
        counterSelector: '[data-el="items-counter"]',
        basketItemTotalSumSelector: '[data-el="basket-item-total-sum"]',
        clearBasketBtnSelector: '[data-el="clear-basket"]',
        totalSumWithDiscountSelector: '[data-el="total-sum-without-discount"]',
        totalDiscountSelector: '[data-el="total-discount"]',
        totalSumSelector: '[data-el="total-sum"]',
        toOrderBtnSelector: '[data-el="to-order-btn"]',
    });
    basketUI.init();
    window.basketUI = basketUI;


    // Инстанс менеджера по работе с корзиной в localstorage
    const basketManager = new BasketManager({
        storageKey: 'products_data',
        preloader: preloader,
        onUpdateCallback: () => {
            basketUI.updateCounter(basketManager.getCount());
            basketUI.updateTotalSums(basketManager.recalculateTotalSum());
            if (basketManager.getCount() === 0) {
                basketUI.toggleOrderPossibility();
            }
        },
    });


    // Инстанс менеджера загрузки товаров
    const productManager = new ProductManager({
        containerId: 'basket-items',
        apiEndpoint: '/api/get-products.php',
        renderEndpoint: '/api/render-products.php',
        storageKey: 'products_data',
        preloader: preloader,
        cacheDuration: 3600 * 1000,
        afterInitCallback: () => {
            basketManager.init();
            window.basketManager = basketManager;

            listingManager.init();
            window.listingManager = listingManager;
        }
    });
    productManager.init();
    window.productManager = productManager;


    // Инстанс менеджера чекбоксов - вероятно, стоит убрать внутрь basketManager
    const listingManager = new ListingManager({
        basketItemCheckboxSelector: '[data-el="basket-item-checkbox"]',
    })


    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-el]');
        if (!target) return;

        const card = e.target.closest('[data-el="basket-item"]');

        if (target.dataset.el === 'minus') {
            window.basketManager.decrement(+card.id);
        } else if (target.dataset.el === 'plus') {
            window.basketManager.increment(+card.id);
        } else if (target.dataset.el === 'item-delete') {
            window.basketManager.remove(+card.id);
        } else if (target.dataset.el === 'clear-basket') {
            window.basketManager.clearBasket();
        } else if (target.dataset.el === 'select-all') {
            if (target.querySelector('input[type="checkbox"]').checked) {
                window.listingManager.selectAll();
            } else {
                window.listingManager.unSelectAll();
            }
        }
        window.basketManager.recalculateTotalSum();
    });
})