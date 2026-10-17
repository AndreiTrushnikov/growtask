class PromocodesManager {
    constructor(options) {
        this.blockSelector = options.blockSelector || '[data-el="promocode-block"]';
        this.inputSelector = options.inputSelector || '[data-el="promocode-input"]';
        this.btnSelector = options.btnSelector || '[data-el="promocode-btn"]';
        this.enteredPromocodeSelector = options.enteredPromocodeSelector || '[data-el="entered-promocode"]';

        this.block      = document.querySelector(this.blockSelector);
        if (!this.block ) {
            return;
        }

        this.input     = this.block.querySelector(this.inputSelector);
        this.submitBtn = this.block.querySelector(this.btnSelector);
        if (!this.input || !this.submitBtn) {
            return;
        }

        this.enteredPromocode = this.block.querySelector(this.enteredPromocodeSelector)
            || (() => {
                const el = document.createElement('div');
                el.className = 'entered-promocode';
                el.dataset.el = 'entered-promocode';
                el.hidden = true;
                this.block.appendChild(el);
                return el;
            })();

        this.url = options.url || '/api/promocode-check.php'
    }



    /**
     * Инициализация
     */
    init() {
        this.addEventListeners();
    }



    /**
     * Добавляем прослушиватели событий
     */
    addEventListeners() {
        this.submitBtn.addEventListener('click', this.onSubmit.bind(this));

        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.onSubmit();
            }
        });

        // Снимаем класс ошибки при вводе
        this.input.addEventListener('input', () => {
            this.input.classList.remove('is-invalid');
        });
    }



    /**
     * Отправка промокода на сервер.
     * @param {string} promocode
     * @returns {Promise<Object>}
     */
    async checkPromocode(promocode) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({ promocode }),
        });

        let payload;
        try {
            payload = await response.json();
        } catch (e) {
            payload = { success: false, message: 'Ошибка сервера' };
        }

        if (!response.ok && payload.success !== false) {
            payload = { success: false, message: payload.message || 'Ошибка запроса' };
        }

        return payload;
    }



    /**
     * Обработчик ответа от сервера.
     * @param {{success: boolean, message: string, discount?: number, type?: string}} result
     */
    handleResponse(result, code) {
        if (result.success) {
            console.log('✅ Промокод применён:', result);
            this.renderPromocode(code, 'success');
            // здесь можно сохранить скидку: localStorage.setItem(...)
        } else {
            console.warn('❌ Промокод отклонён:', result.message);
            this.renderPromocode(code, 'error');
            this.input.classList.add('is-invalid');
        }
    }



    /**
     * Отрисовать промокод.
     * @param {string} code
     * @param {'success'|'error'} type
     */
    renderPromocode(code, type) {
        // Скрываем поле ввода и кнопку
        this.input.hidden = true;
        this.submitBtn.hidden = true;

        this.enteredPromocode.hidden = false;
        this.enteredPromocode.className = 'entered-promocode entered-promocode--' + type;
        this.enteredPromocode.innerHTML = '';

        const text = document.createElement('span');
        text.className = 'entered-promocode__text';
        text.textContent = code;

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'entered-promocode__remove';
        remove.setAttribute('aria-label', 'Удалить промокод');
        remove.innerHTML = '&times;';
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.clearPromocode();
        });

        this.enteredPromocode.append(text, remove);
    }



    /**
     * Убрать промокод и вернуть поле ввода.
     */
    clearPromocode() {
        this.enteredPromocode.hidden = true;
        this.enteredPromocode.innerHTML = '';

        this.input.hidden = false;
        this.submitBtn.hidden = false;
        this.input.value = '';
        this.input.classList.remove('is-invalid');
        this.input.focus();
    }



    /**
     * Основной обработчик клика по кнопке.
     * @returns {Promise<void>}
     */
    async onSubmit() {
        const promocode = this.input.value.trim();
        this.input.classList.remove('is-invalid');

        if (!promocode) {
            this.input.classList.add('is-invalid');
            this.input.focus();
            return;
        }

        const originalText = this.submitBtn.innerHTML;
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = '<span>Проверка…</span>';

        try {
            const result = await this.checkPromocode(promocode);
            this.handleResponse(result, promocode);
        } catch (err) {
            console.error('Ошибка сети:', err);
            this.renderPromocode(promocode, 'error');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = originalText;
        }
    }

}