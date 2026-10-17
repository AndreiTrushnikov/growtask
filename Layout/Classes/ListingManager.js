/**
 * Класс по работе с чекбоксами
 * Вероятно, можно было бы объединить с корзиной, но так как в ТЗ не очень было понятно назначние чекбоксов и до меня
 * дошло только позднее - уже не стал переделывать.
 */
class ListingManager {
    constructor(options = {}) {
        this.basketItemCheckboxSelector = options.basketItemCheckboxSelector || '[data-el="basket-item-checkbox"]';

        this.items = [];
    }

    /**
     * Инициализация
     */
    init() {
        this.items = document.querySelectorAll('[data-el="basket-item-checkbox"]');
    }


    /**
     * Выбирает все чекбоксы с заданным селектором на странице
     */
    selectAll() {
        this.items.forEach(item => {
            if (!item.checked) {
                item.click();
            }
        })
    }


    /**
     * Отключает все чекбоксы с заданным селектором на странице
     */
    unSelectAll() {
        this.items.forEach(item => {
            if (item.checked) {
                item.click();
            }
        })
    }
}