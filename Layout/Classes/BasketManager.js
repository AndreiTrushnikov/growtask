/**
 * Класс для управления корзиной в LocalStorage
 */
class BasketManager {
    /**
     * @param {Object} options - Настройки
     * @param {string} options.storageKey - Ключ для localStorage корзины
     * @param {string} options.preloader - Прелоадер
     * @param {string} options.basketItemsCounters - Селектор мест, где должны обновляться количество элементов в корзине
     * @param {string} options.onUpdateCallback - Функция вызывается при изменении корзины
     */
    constructor(options = {}) {
        this.storageKey = options.storageKey || 'products_data';
        this.onUpdateCallback = options.onUpdateCallback || null; // Колбек для внесения изменений на страницу во время изменения корзины
        this.preloader = options.preloader;

        this.items = [];
    }



    /**
     * Инициализация - загрузка корзины из localStorage
     */
    init() {
        this.loadFromStorage();
        console.log(`[BasketManager] Инициализирован, товаров в корзине: ${this.items.length}`);
    }



    /**
     * Загрузка корзины из localStorage
     */
    loadFromStorage() {
        try {
            const cached = localStorage.getItem(this.storageKey);
            if (cached) {
                this.items = JSON.parse(cached);
                console.log('[BasketManager] Корзина загружена из localStorage');
            } else {
                this.items = [];
            }
        } catch (e) {
            console.error('[BasketManager] Ошибка загрузки корзины:', e);
            this.items = [];
        } finally {
            this.preloader.hide();
        }

        // Вызываем коллбэк для первоначальной загрузки
        if (this.onUpdateCallback && typeof this.onUpdateCallback === 'function') {
            this.onUpdateCallback(this.items);
        }
    }



    /**
     * Сохранение корзины в localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            console.log('[BasketManager] Корзина сохранена в localStorage');

            // Вызываем callback при обновлении
            if (this.onUpdateCallback && typeof this.onUpdateCallback === 'function') {
                this.onUpdateCallback(this.items);
            }
        } catch (e) {
            console.error('[BasketManager] Ошибка сохранения корзины:', e);
        }
    }



    /**
     * Удаление товара из корзины
     * @param {string|number} productId - ID товара
     */
    remove(productId) {
        this.preloader.show();
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== productId);

        if (this.items.length < initialLength) {
            basketUI.removeFromDom(productId);
            console.log(`[BasketManager] Удалён товар ${productId}`);
            this.saveToStorage();

            this.preloader.hide();
            return true;
        }

        console.warn(`[BasketManager] Товар ${productId} не найден в корзине`);

        this.preloader.hide();
        return false;
    }



    /**
     * Изменение количества товара
     * @param {string|number} productId - ID товара
     * @param {number} quantity - Новое количество
     */
    updateQuantity(productId, quantity) {
        this.preloader.show();
        const item = this.items.find(item => item.id === productId);

        if (!item) {
            console.warn(`[BasketManager] Товар ${productId} не найден в корзине`);
            return false;
        }

        if (quantity <= 0) {
            basketUI.removeFromDom(productId);
            return this.remove(productId);
        }

        item.quantity = quantity;

        basketUI.updateQuantity(productId, item.quantity);
        basketUI.updateBasketItemTotalSum(productId, item);
        this.recalculateTotalSum();

        console.log(`[BasketManager] Количество товара ${productId} изменено на ${quantity}`);
        this.saveToStorage();

        this.preloader.hide();
        return true;
    }



    /**
     * Увеличение количества товара на 1
     * @param {number} productId - ID товара
     */
    increment(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item && item.quantity < item.limit) {
            return this.updateQuantity(productId, item.quantity + 1);
        }
        return false;
    }



    /**
     * Уменьшение количества товара на 1
     * @param {string|number} productId - ID товара
     */
    decrement(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            return this.updateQuantity(productId, item.quantity - 1);
        }
        return false;
    }



    /**
     * Получение количества товаров в корзине
     * @returns {number}
     */
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }



    /**
     * Очистка всей корзины
     */
    clearBasket() {
        this.preloader.show();
        this.items.forEach(item => {
            this.remove(item.id);
        })
        basketUI.showClearBasket();
        this.preloader.hide();
    }



    /**
     * Возвращает вычисленную сумму всей корзины без скидки
     * @returns {number}
     */
    recalculateTotalSumWithoutDiscount() {
        return this.items.reduce((sum, item) => {
            if (item.price !== null && item.quantity !== null) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);
    }



    /**
     * Возвращает вычисленную сумму скидки всей корзины
     * @returns {number}
     */
    recalculateTotalDiscount() {
        return this.items.reduce((sum, item) => {
            if (item.old_price !== null && item.price !== null && item.quantity !== null) {
                return sum + (Math.abs(item.old_price) - item.price) * item.quantity;
            }
            return sum;
        }, 0)
    }



    /**
     * Возвращает вычисленную сумму всей корзины СО скидкой
     * @returns {{totalSum: number, totalSumWithoutDiscount: number, discount: number}}
     */
    recalculateTotalSum() {
        let sum = {
            totalSumWithoutDiscount: this.recalculateTotalSumWithoutDiscount(),
            discount: this.recalculateTotalDiscount(),
            totalSum: this.recalculateTotalSumWithoutDiscount() - this.recalculateTotalDiscount()
        }

        basketUI.updateTotalSums(sum);

        return sum;
    }
}