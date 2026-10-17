document.addEventListener('DOMContentLoaded', () => {
    // Создаём инстанс менеджера по работе с успешным заказом
    const orderSuccessManager = new OrderSuccessManager({
        containerId: 'success-page',
        basketKey: 'products_data',
        orderKey: 'order_data',
        orderNumberSelector: '#order-number',
    });
    orderSuccessManager.init();
    window.orderSuccessManager = orderSuccessManager;
})