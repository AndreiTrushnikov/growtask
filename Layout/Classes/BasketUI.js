/**
 * Класс для управления UI корзины
 * Отвечает ТОЛЬКО за обновление DOM
 */
class BasketUI {
    constructor(options = {}) {
        this.countersSelector = options.counterSelector || '[data-el="items-counter"]';

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
            el.textContent = count;
            console.log(`[BasketUI] Счётчик обновлён: ${count}`);
        })
    }



    /**
     * Обновление количества у одного товара
     */
    updateQuantity(productId, quantity) {
        console.log('123')
        document.getElementById(productId).querySelector('[data-el="item-quantity"]').value = quantity;
    }

    remove(productId) {
        document.getElementById(productId).remove();
    }
}