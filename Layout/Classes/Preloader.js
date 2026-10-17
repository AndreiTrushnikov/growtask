class Preloader {
    constructor() {
        this.preloader = null;
        this.init();
    }

    init() {
        // Проверяем, есть ли класс 'has-preloader' у body
        if (document.body.classList.contains('has-preloader')) {
            this.show();

            // Проверяем, загружена ли страница уже
            if (document.readyState === 'complete') {
                this.hide();
            } else {
                window.addEventListener('load', () => this.hide());
            }
        }
    }

    createPreloader() {
        // Создаем элемент прелоадера
        this.preloader = document.createElement('div');
        this.preloader.className = 'preloader hidden';

        // Вставляем SVG
        this.preloader.innerHTML = `            
            <svg width="128" height="128" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                <circle fill='#F23051' stroke='#F23051' stroke-width='3' r='15' cx='40' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='1.3' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate>
                </circle>
                <circle fill='#F23051' stroke='#F23051' stroke-width='3' r='15' cx='100' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='1.3' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate>
                </circle>
                <circle fill='#F23051' stroke='#F23051' stroke-width='3' r='15' cx='160' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='1.3' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate>
                </circle>
            </svg>
        `;

        // Добавляем прелоадер в тело документа
        document.body.appendChild(this.preloader);
    }

    show() {
        // Если элемента нет — создаём его
        if (!this.preloader || !this.preloader.parentNode) {
            this.createPreloader();
        }
        // Показываем на следующем кадре, чтобы сработала CSS-анимация появления
        requestAnimationFrame(() => {
            if (this.preloader) {
                this.preloader.classList.remove('hidden');
            }
        });
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            const el = this.preloader;
            setTimeout(() => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
                // Сбрасываем ссылку, чтобы следующий show() создал элемент заново
                if (this.preloader === el) {
                    this.preloader = null;
                }
            }, 300); // Удаление после завершения анимации
        }
    }
}