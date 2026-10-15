document.addEventListener("DOMContentLoaded", function () {
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
});


// Custom inputs with caption
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

document.addEventListener("DOMContentLoaded", function () {
    const customFormElements = new CustomFormElements();
    customFormElements.init();
})
