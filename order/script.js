document.addEventListener('DOMContentLoaded', () => {
    const orderManager = new OrderManager({
        containerId: 'order-items',
        renderEndpoint: '/api/order-render-products.php',
        storageKey: 'products_data',
        formID: 'order-form',
        afterRenderCallback: () => {
            basketManager.init();
            window.basketManager = basketManager;
        }
    });
    orderManager.init();
    window.orderManager = orderManager;


    // Создаём инстанс менеджера по работе с корзиной в localstorage
    const basketManager = new BasketManager({
        storageKey: 'products_data',
        onUpdateCallback: () => {
            basketUI.updateCounter(basketManager.getCount());
            basketUI.updateTotalSums(basketManager.recalculateTotalSum());
            if (basketManager.getCount() === 0) {
                basketUI.toggleOrderPossibility();
            }
        },
    });


    // Работа с DOM корзины
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
})