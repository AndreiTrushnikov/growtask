class ListingManager {
    constructor(options = {}) {
        this.basketItemCheckboxSelector = options.basketItemCheckboxSelector || '[data-el="basket-item-checkbox"]';

        this.items = [];
    }

    init() {
        this.items = document.querySelectorAll('[data-el="basket-item-checkbox"]');
    }

    selectAll() {
        this.items.forEach(item => {
            if (!item.checked) {
                item.click();
            }
        })
    }

    unSelectAll() {
        this.items.forEach(item => {
            if (item.checked) {
                item.click();
            }
        })
    }
}