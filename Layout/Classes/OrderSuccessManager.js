/**
 * Класс для обработки данных на странице Успешного заказа
 * Данные заказа из localStorage
 */
class OrderSuccessManager {
    /**
     * @param {Object} options
     * @param {string}   options.containerId  - ID контейнера для отрисовки
     * @param {string}   options.basketKey   - Ключ корзины в localStorage
     * @param {string}   options.orderKey   - Ключ заказа в localStorage
     * @param {string}   options.orderNumberSelector      - Ключ корзины в localStorage
     *
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'success-page';
        this.basketKey = options.basketKey || 'products_data';
        this.orderKey = options.orderKey || 'order_data';
        this.orderNumberSelector = options.orderNumberSelector || '#order-number';

        this.container = null;
    }


    /**
     * Инициализация: рендер корзины + подключение валидации.
     * @returns {Promise<void>}
     */
    async init() {
        this.container = document.getElementById(this.containerId);

        if (!this.container) {
            console.error(`[OrderManager] Контейнер с ID "${this.containerId}" не найден`);
        }

        if (this.container) {
            SkeletonManager.show();
            const order = this.getFromLocalStorage(this.orderKey);
            if (!order) {
                this.showEmpty();
            } else {
                await this.renderSuccess(order);
                this.clearBasket();
                this.showFinalMessage(order);
            }
        }
    }



    /**
     * Показывает уведомление, если заказ пустой
     */
    showEmpty() {
        if (this.container) this.container.innerHTML = '<p>Заказ не сформировался. Попробуйте оформить еще раз.</p>';
    }



    /**
     * Читает данные из localStorage.
     * @returns {*[]|any|null}
     */
    getFromLocalStorage(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;

            return JSON.parse(raw);
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return [];
        }
    }



    /**
     * Сохранение заказа в localStorage
     */
    saveToStorage(key, result, success_message, failure_message) {
        try {
            localStorage.setItem(key, JSON.stringify(result));
            console.log(success_message);
        } catch (e) {
            console.error(failure_message, e);
        }
    }



    /**
     * Рендер success информации
     * @param {Array} items
     * @returns {Promise<void>}
     */
    async renderSuccess(result) {
        const orderNumberBlock = document.querySelector(this.orderNumberSelector);
        if (orderNumberBlock) {
            orderNumberBlock.textContent = result.order_id;
        }
        SkeletonManager.hide();
    }



    /**
     * Очищаем корзину
     */
    clearBasket() {
        this.saveToStorage(
            this.basketKey,
            [],
            'Корзина очищена',
            'Не удалось очистить корзину'
        );
    }



    /**
     * Выводит в консоль нужную информацию по заданию
     */
    showFinalMessage(order) {
        console.log(`Заказ №${order.order_id}:`, order.data)
    }
}