/**
 * Класс для управления корзиной в LocalStorage
 */
class BasketManager {
    /**
     * @param {Object} options - Настройки
     * @param {string} options.storageKey - Ключ для localStorage корзины
     * @param {string} options.basketItemsCounters - Селектор мест, где должны обновляться количество элементов в корзине
     * @param {string} options.onInitCallback - Функция вызывается при первой загрузке
     * @param {string} options.onUpdateCallback - Функция вызывается при изменении корзины
     */
    constructor(options = {}) {
        this.storageKey = options.storageKey || 'products_data';
        this.onInitCallback = options.onInitCallback || null; // Колбек для внесения изменений на страницу во время первоначальной загрузки
        this.onUpdateCallback = options.onUpdateCallback || null; // Колбек для внесения изменений на страницу во время изменения корзины

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
        }

        // Вызываем коллбэк для первоначальной загрузки
        if (this.onInitCallback && typeof this.onInitCallback === 'function') {
            this.onInitCallback(this.items);
        }
    }



    /**
     * Сохранение корзины в localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            console.log('[BasketManager] Корзина сохранена в localStorage');

            // Вызываем callback при изменении
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
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== productId);

        if (this.items.length < initialLength) {
            console.log(`[BasketManager] Удалён товар ${productId}`);
            this.saveToStorage();
            return true;
        }

        console.warn(`[BasketManager] Товар ${productId} не найден в корзине`);
        return false;
    }



    /**
     * Изменение количества товара
     * @param {string|number} productId - ID товара
     * @param {number} quantity - Новое количество
     */
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);

        if (!item) {
            console.warn(`[BasketManager] Товар ${productId} не найден в корзине`);
            return false;
        }

        if (quantity <= 0) {
            // Если количество <= 0, удаляем товар
            return this.remove(productId);
        }

        item.quantity = quantity;
        console.log(`[BasketManager] Количество товара ${productId} изменено на ${quantity}`);
        this.saveToStorage();
        return true;
    }



    /**
     * Увеличение количества товара на 1
     * @param {number} productId - ID товара
     */
    increment(productId) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
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
}