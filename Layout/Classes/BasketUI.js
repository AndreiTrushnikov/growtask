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
        console.log('this.counterElements'),this.counterElements
        this.counterElements.forEach(el => {
            console.log('el',el)
            el.textContent = count;
            console.log(`[BasketUI] Счётчик обновлён: ${count}`);
        })
    }
}