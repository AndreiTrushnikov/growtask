/**
 * Класс для получения товаров и кэширование их в localStorage
 * Кэш хранится ТОЛЬКО в браузере, PHP файлы только проксируют запросы к API
 */
class ProductManager {
    /**
     * @param {Object} options - Настройки
     * @param {string} options.containerId - ID контейнера для товаров
     * @param {string} options.apiEndpoint - URL для получения данных
     * @param {string} options.renderEndpoint - URL для рендеринга HTML
     * @param {string} options.storageKey - Ключ для localStorage
     * @param {number} options.cacheDuration - Время жизни кэша в миллисекундах (по умолчанию 1 час)
     * @param {number} options.afterInitCallback - Функция вызывается после загрузки данных с удаленного сервера
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'basket-items';
        this.apiEndpoint = options.apiEndpoint || '/api/get-products.php';
        this.renderEndpoint = options.renderEndpoint || '/api/render-products.php';

        this.cacheDuration = options.cacheDuration || 3600 * 1000;

        this.storageKey = options.storageKey || 'products_data';
        this.expiresKey = this.storageKey + '_expires_at'; //

        this.afterInitCallback = options.afterInitCallback || null;

        this.container = null;
        this.cachedData = null;
    }

    /**
     * Инициализация
     */
    async init() {
        this.container = document.getElementById(this.containerId);

        if (!this.container) {
            console.error(`[ProductManager] Контейнер с ID "${this.containerId}" не найден`);
            return;
        }

        this.showLoading();

        // Проверяем localStorage
        const cachedData = this.checkLocalStorage();

        if (cachedData) {
            // Данные есть в кэше — используем их, запросов к API НЕТ
            console.log('[ProductManager] Данные загружены из localStorage');
            this.cachedData = cachedData;
            await this.renderProducts(cachedData);
        } else {
            // Кэша нет — делаем запрос к API
            console.log('[ProductManager] Запрос к API...');
            await this.loadProductsFromApi();
        }

        // Вызываем коллбэк для первоначальной загрузки
        if (this.afterInitCallback && typeof this.afterInitCallback === 'function') {
            this.afterInitCallback();
        }
    }



    /**
     * Проверка localStorage на наличие актуальных данных
     * @returns {Array|null} Массив данных или null
     */
    checkLocalStorage() {
        try {
            const cached = localStorage.getItem(this.storageKey);
            const expiresAt = Number(localStorage.getItem(this.expiresKey));

            if (!cached || !expiresAt) return null;

            // Если срок истёк — чистим
            if (Date.now() >= expiresAt) {
                localStorage.removeItem(this.storageKey);
                localStorage.removeItem(this.expiresKey);
                return null;
            }

            // Срок актуален — возвращаем данные как есть
            return JSON.parse(cached).data ?? JSON.parse(cached);
        } catch (e) {
            console.error('[ProductManager] Ошибка чтения из localStorage:', e);
            return null;
        }
    }



    /**
     * Сохранение данных в localStorage
     * @param {Array} data - Данные для сохранения
     */
    saveToLocalStorage(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));

            if (!localStorage.getItem(this.expiresKey)) {
                localStorage.setItem(this.expiresKey, String(Date.now() + this.cacheDuration));
            }
        } catch (e) {
            console.error('[ProductManager] Ошибка записи в localStorage:', e);
        }
    }



    /**
     * Загрузка товаров из API
     * @returns {Promise<void>}
     */
    async loadProductsFromApi() {
        try {
            // Получаем данные из API
            const dataResponse = await fetch(this.apiEndpoint);
            const dataResult = await dataResponse.json();

            if (!dataResult.success || !Array.isArray(dataResult.data)) {
                throw new Error('Неверный формат данных от API');
            }

            // Удаляем нулевые остатки
            dataResult.data = this.deleteZeroItems(dataResult.data);

            // Сохраняем в localStorage
            this.saveToLocalStorage(dataResult.data);
            this.cachedData = dataResult.data;

            // Рендерим HTML
            await this.renderProducts(dataResult.data);

        } catch (error) {
            console.error('[ProductManager] Ошибка загрузки:', error);
            this.showError('Ошибка загрузки товаров');
        }
    }



    /**
     * В корзине не должно быть товаров с 0 остатками, они автоматически должны удаляться.
     * Поэтому метод сразу удаляет те товары, что пришли с бэка.
     * Да, вероятно это не подходит под вашу задачу, но я пока что сделал так - всегда можно переделать
     * под нужные условия.
     */
    deleteZeroItems(items) {
        return items.filter(el => el.quantity > 0);
    }



    /**
     * Рендеринг товаров через PHP шаблон
     * @param {Array} products - Массив товаров
     */
    async renderProducts(products) {
        try {
            // Отправляем данные в PHP для рендеринга HTML
            const response = await fetch(this.renderEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: products })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error('Ошибка рендеринга на сервере');
            }

            this.container.innerHTML = result.html;
            console.log('[ProductManager] Товары успешно отрендерены');

        } catch (error) {
            console.error('[ProductManager] Ошибка рендеринга:', error);
            this.showError('Ошибка отображения товаров');
        }
    }



    /**
     * Показывает уведомление о загрузке элементов корзины
     */
    showLoading() {
        if (this.container) {
            this.container.innerHTML = '<p>Загрузка товаров...</p>';
        }
    }



    /**
     * Показывает строку с ошибкой
     * @param {string} message - Текст ошибки
     */
    showError(message) {
        if (this.container) {
            this.container.innerHTML = `<p>${message}</p>`;
        }
    }
}