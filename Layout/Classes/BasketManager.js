/**
 * Класс для управления корзиной в LocalStorage
 */
class BasketManager {
    /**
     * @param {Object} options - Настройки
     * @param {string} options.storageKey - Ключ для localStorage корзины
     * @param {string} options.onUpdateCallback - Функция вызывается при изменении корзины
     */
    constructor(options = {}) {
        this.storageKey = options.storageKey || 'products_data';
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
    }
}