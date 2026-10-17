document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем прелоадер
    const preloader = new Preloader();
    preloader.init();

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



    // Создаём инстанс менеджера по работе с корзиной в localstorage
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

    const promocodesManager = new PromocodesManager({
        url: '/api/promocode-check.php',
        blockSelector: '[data-el="promocode-block"]',
        inputSelector: '[data-el="promocode-input"]',
        btnSelector:   '[data-el="promocode-btn"]',
        enteredPromocodeSelector:   '[data-el="entered-promocode"]',
    });
    promocodesManager.init();
    window.promocodesManager = promocodesManager;


    // Создаём инстанс менеджера по работе со страницей оформления заказаы
    const orderManager = new OrderManager({
        containerId: 'order-items',
        renderEndpoint: '/api/order-render-products.php',
        storageKey: 'products_data',
        orderKey: 'order_data',
        formID: 'order-form',
        preloader: preloader,
        afterRenderCallback: () => {
            basketManager.init();
            window.basketManager = basketManager;
        }
    });
    orderManager.init();
    window.orderManager = orderManager;
})