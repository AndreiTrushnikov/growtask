document.addEventListener('DOMContentLoaded', () => {
    // Создаём инстанс менеджера по работе с корзиной в localstorage
    const basketManager = new BasketManager({
        storageKey: 'products_data',
        onUpdateCallback: () => {
            basketUI.updateCounter(basketManager.getCount());
        },
    });

    // Работа с менеджером загрузки товаров
    const productManager = new ProductManager({
        containerId: 'basket-items',
        apiEndpoint: '/api/get-products.php',
        renderEndpoint: '/api/render-products.php',
        storageKey: 'products_data',
        cacheDuration: 3600 * 1000,
        afterInitCallback: () => {
            basketManager.init();
            window.basketManager = basketManager;
        }
    });
    productManager.init();
    window.productManager = productManager;

    // Работа с корзиной
    const basketUI = new BasketUI({
        counterSelector: '[data-el="items-counter"]',
        basketItemTotalSumSelector: '[data-el="basket-item-total-sum"]',
        clearBasketBtnSelector: '[data-el="clear-basket"]',
    });
    basketUI.init();
    window.basketUI = basketUI;

    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-el]');
        if (!target) return;

        const card = e.target.closest('[data-el="basket-item"]');
        console.log('card',card)
        if (target.dataset.el === 'minus') {
            window.basketManager.decrement(+card.id);
        } else if (target.dataset.el === 'plus') {
            window.basketManager.increment(+card.id);
        } else if (target.dataset.el === 'item-delete') {
            window.basketManager.remove(+card.id);
        } else if (target.dataset.el === 'clear-basket') {
            window.basketManager.clearBasket();
        }
    });
})