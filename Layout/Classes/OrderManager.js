/**
 * Класс для отрисовки корзины и оформления заказа
 * Данные корзины из localStorage
 */
class OrderManager {
    /**
     * @param {Object} options
     * @param {string}   options.containerId        - ID контейнера для отрисовки
     * @param {string}   options.renderEndpoint     - URL PHP-рендера корзины
     * @param {string}   options.submitEndpoint     - URL отправки заявки
     * @param {string}   options.storageKey         - Ключ корзины в localStorage
     * @param {string}   options.orderKey           - Ключ заказа в localStorage
     * @param {Function} options.afterRenderCallback- Коллбэк после отрисовки
     * @param {string}   options.formID             - ID формы
     * @param {string}   options.preloader          - Прелоадер
     * @param {Function} options.onSuccessCallback  - Коллбэк после успешной отправки (result)
     * @param {Function} options.onErrorCallback    - Коллбэк при ошибке (error)
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'order-items';
        this.renderEndpoint = options.renderEndpoint || '/api/order-render-products.php';
        this.submitEndpoint = options.submitEndpoint || '/api/success.php';
        this.storageKey = options.storageKey || 'products_data';
        this.orderKey = options.orderKey || 'order_data';
        this.formID = options.formID || 'order-form';
        this.preloader = options.preloader || null;

        this.afterRenderCallback = options.afterRenderCallback || null;
        this.onSuccessCallback = options.onSuccessCallback || null;
        this.onErrorCallback = options.onErrorCallback || null;

        this.container = null;
        this.form = null;
        this.validation = null;
        this._validatorInitialized = false;


    }


    /**
     * Инициализация: рендер корзины + подключение валидации.
     * @returns {Promise<void>}
     */
    async init() {
        this.container = document.getElementById(this.containerId);
        this.form = document.getElementById(this.formID);

        if (!this.container) {
            console.error(`[OrderManager] Контейнер с ID "${this.containerId}" не найден`);
        }

        if (!this.form) {
            console.error(`[OrderManager] Форма с ID "${this.formID}" не найдена`);
            return;
        }
        this.preloader.show();
        this.validate();

        if (this.container) {
            this.showLoading();
            const items = this.getFromLocalStorage();

            if (!items || !items.length) {
                this.showEmpty();
            } else {
                await this.renderCheckout(items);
            }
        }

        if (typeof this.afterRenderCallback === 'function') {
            this.afterRenderCallback();
        }
    }


    /**
     * Читает данные из localStorage.
     * @returns {*[]|any|null}
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
     * @param {Array} items
     * @returns {Promise<void>}
     */
    async renderCheckout(items) {
        try {
            this.preloader.show();
            // Отправляем данные в PHP для рендеринга HTML
            const response = await fetch(this.renderEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: items })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Ошибка рендеринга на сервере');
            }

            this.container.innerHTML = result.html;
            console.log('[OrderManager] Товары успешно отрисованы');
        } catch (error) {
            console.error('[OrderManager] Ошибка рендеринга:', error);
            this.showError('Ошибка отображения корзины');
        } finally {
            this.preloader.hide();
        }
    }


    /**
     * Показывает уведомление о загрузке элементов корзины
     */
    showLoading() {
        if (this.container) this.container.innerHTML = '<p>Загрузка корзины...</p>';
    }


    /**
     * Показывает уведомление, если корзина пуста
     */
    showEmpty() {
        if (this.container) this.container.innerHTML = '<p>Корзина пуста</p>';
    }


    /**
     * Показывает строку с ошибкой
     * @param {string} message - Текст ошибки
     */
    showError(message) {
        if (this.container) this.container.innerHTML = `<p>${message}</p>`;
    }


    /**
     * Инициализирует JustValidate для формы.
     * @returns {JustValidate|null}
     */
    validate() {
        if (this._validatorInitialized) {
            return this.validation;
        }

        if (!this.form) {
            this.form = document.getElementById(this.formID);
            if (!this.form) return null;
        }

        const validatorRules = new Map([
            ['first-name', [
                { rule: 'required', errorMessage: 'Поле обязательно для заполнения' },
                { rule: 'customRegexp', value: /^[a-zA-Zа-яА-ЯёЁ]+$/u, errorMessage: 'Допустимы только кириллица и латиница' },
            ]],
            ['last-name', [
                { rule: 'required', errorMessage: 'Поле обязательно для заполнения' },
                { rule: 'customRegexp', value: /^[a-zA-Zа-яА-ЯёЁ]+$/u, errorMessage: 'Допустимы только кириллица и латиница' },
            ]],
            ['phone', [
                { rule: 'required', errorMessage: 'Поле обязательно для заполнения' },
                { rule: 'customRegexp', value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, errorMessage: 'Телефон введён некорректно' },
            ]],
            ['email', [
                { rule: 'required', errorMessage: 'Поле обязательно для заполнения' },
                { rule: 'customRegexp', value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, errorMessage: 'Формат email некорректный' },
            ]],
            ['comment', [
                { rule: 'maxLength', value: 1000, errorMessage: 'Слишком длинный комментарий' },
            ]],
        ]);

        this.validation = new JustValidate(this.form, {
            errorFieldCssClass: 'custom-input--error',
            errorLabelCssClass: 'invalid',
        });

        this.validation
            .addField('#first-name', validatorRules.get('first-name'))
            .addField('#last-name', validatorRules.get('last-name'))
            .addField('#phone', validatorRules.get('phone'))
            .addField('#email', validatorRules.get('email'))
            .addField('#comment', validatorRules.get('comment'))
            .onSuccess(async (e) => {
                await this.onSubmit(e);
            })
            .onFail(() => {
                console.warn('[OrderManager] Форма содержит ошибки');
            });

        this._validatorInitialized = true;
        return this.validation;
    }



    /**
     * Отправка формы. Вызывается из onSuccess JustValidate.
     * @param {Event} e
     * @returns {Promise<void>}
     */
    async onSubmit(e) {
        const form = e.target;
        const submitBtn = form.querySelector('[type="submit"]');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
        }

        try {
            this.preloader.show();
            const formData = new FormData(form);

            const items = this.getFromLocalStorage() || [];
            formData.set('items', JSON.stringify(items));

            const response = await fetch(this.submitEndpoint, {
                method: 'POST',
                body: formData,
            });

            // Обработка разных ошибок
            if (!response.ok) {
                let payload = null;
                try { payload = await response.json(); } catch { /* not json */ }
                throw Object.assign(new Error(`HTTP ${response.status}`), { payload });
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Ошибка сервера');
            }

            this.createOrder(result);
            form.reset();

            if (typeof this.onSuccessCallback === 'function') {
                this.onSuccessCallback(result);
            }

            window.location = "/order/success/";
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            if (typeof this.onErrorCallback === 'function') {
                this.onErrorCallback(error);
            }
        } finally {
            this.preloader.hide();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.dataset.originalText;
            }
        }
    }


    /**
     * Псевдо-создание заказа
     * @param {Object} result - ответ сервера
     */
    createOrder(result) {
        this.saveToStorage(result);
        console.log('[OrderManager] Заказ создан:', result);
    }



    /**
     * Сохранение заказа в localStorage
     */
    saveToStorage(result) {
        try {
            localStorage.setItem(this.orderKey, JSON.stringify(result));
            console.log('[OrderManager] Корзина сохранена в localStorage');
        } catch (e) {
            console.error('[BasketManager] Ошибка сохранения корзины:', e);
        }
    }
}