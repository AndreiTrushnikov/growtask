/**
 * Класс для отрисовки корзины на странице оформления заказа.
 * Данные берёт из того же ключа localStorage, что и ProductManager.
 * Рендерит через отдельный PHP-шаблон.
 */
class OrderManager {
    /**
     * @param {Object} options
     * @param {string} options.containerId - ID контейнера для отрисовки
     * @param {string} options.renderEndpoint - URL PHP-рендера
     * @param {string} options.storageKey - Ключ в localStorage (тот же, что у ProductManager)
     * @param {Function} options.afterRenderCallback - Коллбэк после отрисовки
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'order-items';
        this.renderEndpoint = options.renderEndpoint || '/api/order-render-products.php';
        this.storageKey = options.storageKey || 'products_data';

        this.afterRenderCallback = options.afterRenderCallback || null;

        this.container = null;
    }

    async init() {
        this.container = document.getElementById(this.containerId);

        if (!this.container) {
            console.error(`[OrderManager] Контейнер с ID "${this.containerId}" не найден`);
            return;
        }

        this.showLoading();

        const items = this.getFromLocalStorage();

        if (!items || !items.length) {
            this.showEmpty();
            return;
        }

        await this.renderCheckout(items);

        if (typeof this.afterRenderCallback === 'function') {
            this.afterRenderCallback();
        }
    }

    /**
     * Читает данные из localStorage.
     * @returns {Array}
     */
    getFromLocalStorage() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return null;

            return JSON.parse(raw).data ?? JSON.parse(raw);
        } catch (e) {
            console.error('[OrderManager] Ошибка чтения из localStorage:', e);
            return [];
        }
    }

    /**
     * Рендер корзины через PHP-шаблон.
     */
    async renderCheckout(items) {
        try {
            // Отправляем данные в PHP для рендеринга HTML
            const response = await fetch(this.renderEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: items })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Ошибка рендеринга на сервере');
            }

            this.container.innerHTML = result.html;
            console.log('[OrderManager] Товары успешно отрисованы');

        } catch (error) {
            console.error('[OrderManager] Ошибка рендеринга:', error);
            this.showError('Ошибка отображения корзины');
        }
    }

    showLoading() {
        if (this.container) this.container.innerHTML = '<p>Загрузка корзины...</p>';
    }

    showEmpty() {
        if (this.container) this.container.innerHTML = '<p>Корзина пуста</p>';
    }

    showError(message) {
        if (this.container) this.container.innerHTML = `<p>${message}</p>`;
    }
}