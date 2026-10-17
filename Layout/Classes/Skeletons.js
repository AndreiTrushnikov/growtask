class SkeletonLoader {
    constructor() {
        this.skeletonElements = document.querySelectorAll('.skeleton');
        this.handleLoad = this.handleLoad.bind(this);

        // Проверяем, если страница уже загружена
        if (this.skeletonElements.length === 0) {
            return;
        }

        if (document.readyState === 'complete') {
            this.handleLoad();
        } else {
            window.addEventListener('load', this.handleLoad);
        }
    }

    handleLoad() {
        this.skeletonElements.forEach(el => {
            el.classList.add('loaded');
        });

        window.removeEventListener('load', this.handleLoad);
    }
}

class SkeletonManager {
    static show(container) {
        if (!container) {
            container = document;
        }
        const elements = container.querySelectorAll('.skeleton');
        elements.forEach(el => {
            el.classList.remove('loaded');
            el.classList.add('skeleton');
        });
    }

    static hide(container) {
        if (!container) {
            container = document;
        }
        const elements = container.querySelectorAll('.skeleton');
        elements.forEach(el => {
            el.classList.add('loaded');
            el.classList.remove('skeleton');
        });
    }
}
