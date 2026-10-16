document.addEventListener('DOMContentLoaded', () => {
    const orderManager = new OrderManager({
        containerId: 'order-items',
        renderEndpoint: '/api/order-render-products.php',
        storageKey: 'products_data',
        afterRenderCallback: () => {

        }
    });
    orderManager.init();
    window.orderManager = orderManager;
})