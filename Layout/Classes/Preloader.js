class PagePreloader {
    constructor() {
        this.preloader = null;
        this.init();
    }

    init() {
        // Проверяем, есть ли класс 'has-preloader' у body
        if (document.body.classList.contains('has-preloader')) {
            this.createPreloader();
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
        this.preloader.className = 'preloader';

        // Вставляем SVG шестерёнку
        this.preloader.innerHTML = `
          <svg class="gear" width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g stroke-width="2" transform="translate(0, 0)">
                <circle cx="32" cy="32" r="9" fill="none" stroke="#fff" stroke-linecap="square" stroke-miterlimit="10" />
                <path d="M62,36V28l-8.595-1.074a21.825,21.825,0,0,0-2.681-6.474l5.317-6.836L50.384,7.959l-6.836,5.317A21.9,21.9,0,0,0,37.074,10.6L36,2H28l-1.074,8.6a21.825,21.825,0,0,0-6.474,2.681L13.616,7.959,7.959,13.616l5.317,6.836A21.9,21.9,0,0,0,10.6,26.926L2,28v8l8.6,1.074a21.825,21.825,0,0,0,2.681,6.474L7.959,50.384l5.657,5.657,6.836-5.317a21.9,21.9,0,0,0,6.474,2.681L28,62h8l1.074-8.595a21.825,21.825,0,0,0,6.474-2.681l6.836,5.317,5.657-5.657-5.317-6.836a21.9,21.9,0,0,0,2.681-6.474Z"
                      fill="none" stroke="#fff" stroke-linecap="square" stroke-miterlimit="10" />
              </g>
          </svg>
        `;

        // Добавляем прелоадер в тело документа
        document.body.appendChild(this.preloader);
    }

    show() {
        if (this.preloader) {
            this.preloader.classList.remove('hidden');
        }
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            setTimeout(() => {
                if (this.preloader && this.preloader.parentNode) {
                    this.preloader.parentNode.removeChild(this.preloader);
                }
            }, 300); // Удаление после завершения анимации
        }
    }
}
