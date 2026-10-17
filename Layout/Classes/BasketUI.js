/**
 * Класс для управления UI корзины
 * Отвечает ТОЛЬКО за обновление DOM
 */
class BasketUI {
    constructor(options = {}) {
        this.itemsContainerSelector = options.itemsContainerSelector || "basket-items";
        this.countersSelector = options.counterSelector || '[data-el="items-counter"]';
        this.basketItemTotalSumSelector = options.basketItemTotalSumSelector || '[data-el="basket-item-total-sum"]';
        this.clearBasketBtnSelector = options.clearBasketBtnSelector || '[data-el="clear-basket"]';

        this.totalSumWithoutDiscountSelector = options.totalSumWithoutDiscountSelector || '[data-el="total-sum-without-discount"]';
        this.totalDiscountSelector = options.totalDiscountSelector || '[data-el="total-discount"]';
        this.totalSumSelector = options.totalSumSelector || '[data-el="total-sum"]';

        this.toOrderBtnSelector = options.toOrderBtnSelector || '[data-el="to-order-btn"]';

        this.disableSelector = 'disabled';

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
     * @param {number} count - Общее количество товаров
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
     * @param {string|number} productId - ID товара
     * @param {number} quantity - количество позиций определённого товара
     */
    updateQuantity(productId, quantity) {
        document.getElementById(productId).querySelector('[data-el="item-quantity"]').value = quantity;
    }



    /**
     * Удаление элемента со страницы
     * @param {string|number} productId - ID товара
     */
    removeFromDom(productId) {
        if (!document.getElementById(productId)) return;

        document.getElementById(productId).remove();
    }


    /**
     * Обновление тотал суммы у одного товара
     * @param {string|number} productId - ID товара
     * @param {{}} item
     */
    updateBasketItemTotalSum(productId, item) {
        document.getElementById(productId).querySelector(this.basketItemTotalSumSelector).textContent = item.price * item.quantity;
    }


    /**
     * Обновляет визуально финальные цены в корзине и миникорзине
     * @param {{}} sums
     */
    updateTotalSums(sums) {
        document.querySelectorAll(this.totalSumWithoutDiscountSelector).forEach(el => {
            el.textContent = sums.totalSumWithoutDiscount;
        })
        document.querySelectorAll(this.totalDiscountSelector).forEach(el => {
            el.textContent = sums.discount;
        })
        document.querySelectorAll(this.totalSumSelector).forEach(el => {
            el.textContent = sums.totalSum;
        })
    }


    /**
     * Тогглит дизейбл у кнопки перехода на страницу заказа
     */
    toggleOrderPossibility() {
        document.querySelector(this.toOrderBtnSelector)?.classList.toggle(this.disableSelector);
    }

    showClearBasket() {
        document.getElementById(this.itemsContainerSelector).innerHTML = '<p>Корзина пуста.</p>';
    }
}