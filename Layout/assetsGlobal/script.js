/**
 * Класс для работы с кастомными инпутами
 */
class CustomFormElements {
    constructor() {
        this.customLabels = document.querySelectorAll('.custom-label');
    }

    init () {
        if (this.customLabels) {
            this.customLabels.forEach((label) => {
                const el = label.querySelector('.custom-el');
                if (!el) return;

                const placeholder = label.querySelector('.placeholder');
                if (placeholder && el.value !== "") {
                    placeholder.classList.add('clicked');
                }

                if (label.classList.contains('disabled')) return;

                if (placeholder) {
                    label.addEventListener('click', this._ref_handleEventsOnEl);
                    el.addEventListener( 'focusin', this._ref_handleEventsOnEl);
                    el.addEventListener(   'input', this._ref_handleEventsOnEl);
                }
            })
        }
    }



    /**
     *  Рефы и хендлеры для обработки событий элементов с отдельным плейсхолдером в виде тега span
     * @param e
     * @private
     */
    _ref_handleEventsOnEl = (e) => {
        this.handleEventsOnEl(e);
    }
    handleEventsOnEl(e) {
        if (e.target instanceof HTMLSpanElement || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            const label = e.target.closest('label');
            this.handleActionsInElement(label);
        }
    }



    /**
     * Действия во время изменения или клика или перевода фокуса в элементы
     * @param label
     */
    handleActionsInElement(label) {
        const placeholder = label.querySelector('.placeholder');
        if (placeholder) placeholder.classList.add('clicked');

        const elInput = label.querySelector('input');
        if (elInput) elInput.focus();

        const elTextarea = label.querySelector('textarea');
        if (elTextarea) elTextarea.focus();
    }
}

/**
 * Класс для управления товарами с кэшированием в localStorage
 */
class ProductManager {
    /**
     * @param {Object} options - Настройки
     * @param {string} options.containerId - ID контейнера для товаров
     * @param {string} options.apiEndpoint - URL для получения данных
     * @param {string} options.renderEndpoint - URL для получения отрендеренного HTML
     * @param {string} options.storageKey - Ключ для localStorage
     * @param {number} options.cacheDuration - Время жизни кэша в миллисекундах (по умолчанию 1 час)
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'products-container';
        this.apiEndpoint = options.apiEndpoint || '/api/get-products.php';
        this.renderEndpoint = options.renderEndpoint || '/api/render-products.php';
        this.storageKey = options.storageKey || 'products_data';
        this.cacheDuration = options.cacheDuration || 3600 * 1000;

        this.container = null;
        this.cachedData = null;
    }



    /**
     * Инициализация
     */
    async init() {
        this.container = document.getElementById(this.containerId);

        if (!this.container) {
            console.error(`Контейнер с ID "${this.containerId}" не найден`);
            return;
        }

        this.showLoading();

        // Проверяем localStorage
        const cachedData = this.checkLocalStorage();

        if (cachedData) {
            // Данные есть в кэше — используем их
            console.log('Данные загружены из localStorage');
            this.cachedData = cachedData;
            await this.renderProducts();
        } else {
            // Кэша нет — делаем запрос к API
            console.log('Запрос к API...');
            await this.loadProductsFromApi();
        }
    }



    /**
     * Проверка localStorage на наличие актуальных данных
     * @returns {Array|null} Массив данных или null
     */
    checkLocalStorage() {
        try {
            const cached = localStorage.getItem(this.storageKey);
            if (!cached) return null;

            const parsed = JSON.parse(cached);

            // Проверяем актуальность
            if (Date.now() - parsed.timestamp < this.cacheDuration) {
                return parsed.data;
            }

            // Если устарели, удаляем
            localStorage.removeItem(this.storageKey);
            return null;
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return null;
        }
    }



    /**
     * Сохранение данных в localStorage
     * @param {Array} data - Данные для сохранения
     */
    saveToLocalStorage(data) {
        try {
            const payload = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
            console.log('Данные сохранены в localStorage');
        } catch (e) {
            console.error('Ошибка записи в localStorage:', e);
        }
    }



    /**
     * Загрузка товаров из API
     */
    async loadProductsFromApi() {
        try {
            // Получаем данные
            const dataResponse = await fetch(this.apiEndpoint);
            const dataResult = await dataResponse.json();

            if (!dataResult.success || !Array.isArray(dataResult.data)) {
                throw new Error('Неверный формат данных от API');
            }

            // Сохраняем в localStorage
            this.saveToLocalStorage(dataResult.data);
            this.cachedData = dataResult.data;

            // Рендерим HTML через PHP
            await this.renderProducts();

        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.showError('Ошибка загрузки товаров');
        }
    }



    /**
     * Получение отрендеренного HTML от сервера
     * @returns {Promise<string>} HTML строка
     */
    async fetchRenderedHTML() {
        try {
            const response = await fetch(this.renderEndpoint);
            const result = await response.json();

            if (!result.success) {
                throw new Error('Ошибка рендеринга на сервере');
            }

            return result.html;
        } catch (error) {
            console.error('Ошибка получения HTML:', error);
            throw error;
        }
    }



    /**
     * Рендеринг товаров
     */
    async renderProducts() {
        try {
            // Получаем отрендеренный HTML от PHP
            const html = await this.fetchRenderedHTML();
            this.container.innerHTML = html;
            console.log('Товары успешно отрендерены');
        } catch (error) {
            console.error('Ошибка рендеринга:', error);
            this.showError('Ошибка отображения товаров');
        }
    }



    /**
     * Отображение состояния загрузки
     */
    showLoading() {
        if (this.container) {
            this.container.innerHTML = '<p>Загрузка товаров...</p>';
        }
    }



    /**
     * Отображение ошибки
     * @param {string} message - Текст ошибки
     */
    showError(message) {
        if (this.container) {
            this.container.innerHTML = `<p>${message}</p>`;
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Работа аккордеонов
    const accordions = document.querySelectorAll('[data-el-type="accordion"]');
    if (accordions) {
        accordions.forEach((accordion) => {
            accordion.addEventListener('click', () => {
                if (accordion.classList.contains('show')) {
                    accordion.classList.remove('show');
                } else {
                    accordion.classList.add('show');
                }
            });
        });
    }

    // Работа с кастомными инпутами
    const customFormElements = new CustomFormElements();
    customFormElements.init();


    // Работа с менеджером товаров
    const productManager = new ProductManager({
        containerId: 'basket-items',
        apiEndpoint: '/api/get-products.php',
        renderEndpoint: '/api/render-products.php',
        storageKey: 'products_data',
        cacheDuration: 3600 * 1000
    });
    productManager.init();
    window.productManager = productManager;
})





