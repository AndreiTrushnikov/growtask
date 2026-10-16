/**
 * Класс для управления UI корзины
 * Отвечает ТОЛЬКО за обновление DOM
 */
class BasketUI {
    constructor(options = {}) {
        this.countersSelector = options.counterSelector || '[data-el="items-counter"]';
        this.basketItemTotalSumSelector = options.basketItemTotalSumSelector || '[data-el="basket-item-total-sum"]';

        this.counterElements = null;
    }



    /**
     * Инициализация UI
     */
    init() {
        this.counterElements = document.querySelectorAll(this.countersSelector);
    }



    /**
     * Обновление счётчика корзины
     * @param {number} count - Количество товаров
     */
    updateCounter(count) {
        this.counterElements.forEach(el => {
            if (el.dataset.type && el.dataset.type === 'with-word') {
                el.textContent = declineWord(count, 'товар', 'товара', 'товаров');
            } else {
                el.textContent = count;
            }

            console.log(`[BasketUI] Счётчик обновлён: ${count}`);
        })
    }



    /**
     * Обновление количества у одного товара
     */
    updateQuantity(productId, quantity) {
        document.getElementById(productId).querySelector('[data-el="item-quantity"]').value = quantity;
    }



    /**
     * Удаление элемента со страницы
     * @param productId
     */
    removeFromDom(productId) {
        if (!document.getElementById(productId)) return;

        document.getElementById(productId).remove();
    }



    /**
     * Обновление тотал суммы у одного товара
     */
    updateBasketItemTotalSum(productId, item) {
        document.getElementById(productId).querySelector(this.basketItemTotalSumSelector).textContent = item.price * item.quantity;
    }
}