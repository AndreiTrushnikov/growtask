<?// Card ?>
<?php
if (empty($product)) {
    return;
}
?>
<div class="basket-item-wrapper">
    <div class="basket-item">
        <div class="basket-item__image">
            <label class="custom-checkbox basket-item-checkbox">
                <input type="checkbox" class="custom-checkbox__input">
                <span class="custom-checkbox__icon"></span>
            </label>
            <? if (!empty($product['image'])) {
                $path = $product['image'];
                $name = $product['name'];
            } else {
                $path = '/assets/noimage.png';
                $name = 'Нет изображения';
            } ?>
            <img src="<?= $path; ?>" alt="<?= $name; ?>" title="<?= $name; ?>">
        </div>
        <div class="basket-item__info">
            <div class="basket-item__sku">
                <?= $product['sku']; ?>
            </div>
            <div class="basket-item__name">
                <?= $product['name']; ?>
            </div>
        </div>
        <div class="basket-item__prices">
            <div class="price">
                <? if (!empty($product['price'])) {?>
                <div class="price__new">
                    <?= number_format($product['price'], 0, '.', ' '); ?> ₽
                </div>
                <? } ?>
                <? if (!empty($product['old_price'])) {?>
                <div class="price__old">
                    <?= number_format($product['old_price'], 0, '.', ' '); ?> ₽
                </div>
                <? } ?>
            </div>
            <div class="basket-item__buttons">
                <div class="basket-item__buttons-inner">
                    <div class="btns-plus-minus">
                        <button class="btn btn--grey btns-plus-minus__minus" type="button" aria-label="Удалить">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.9987 7.33331C13.3669 7.33331 13.6654 7.63179 13.6654 7.99998C13.6654 8.36817 13.3669 8.66665 12.9987 8.66665H2.9987C2.63051 8.66665 2.33203 8.36817 2.33203 7.99998C2.33203 7.63179 2.63051 7.33331 2.9987 7.33331H12.9987Z" />
                            </svg>
                        </button>
                        <input type="text" class="btns-plus-minus__input" value="1">
                        <button class="btn btn--grey btns-plus-minus__plus" type="button" aria-label="Добавить">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33333 12.9999V8.66658H2.9987C2.63051 8.66658 2.33203 8.36811 2.33203 7.99992C2.33208 7.63177 2.63054 7.33325 2.9987 7.33325H7.33333V2.99992C7.33333 2.63173 7.63181 2.33325 8 2.33325C8.36819 2.33325 8.66667 2.63173 8.66667 2.99992V7.33325H12.9987C13.3669 7.33325 13.6653 7.63177 13.6654 7.99992C13.6654 8.36811 13.3669 8.66658 12.9987 8.66658H8.66667V12.9999C8.66667 13.3681 8.36819 13.6666 8 13.6666C7.63181 13.6666 7.33333 13.3681 7.33333 12.9999Z" />
                            </svg>
                        </button>
                    </div>
                    <div class="total-item-price">
                        <span>000 000000</span> ₽
                    </div>
                </div>
                <button class="btn btn--grey btn--no-svg-fill basket-item__buttons-delete-btn" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9355L19.2969 16.5859C19.2453 17.359 19.2029 17.997 19.127 18.5146C19.0492 19.0444 18.926 19.5293 18.6689 19.9805C18.2688 20.6827 17.6648 21.2471 16.9375 21.5996C16.4703 21.826 15.979 21.9166 15.4453 21.959C14.9238 22.0004 14.2845 22 13.5098 22H10.4902C9.71551 22 9.07621 22.0004 8.55469 21.959C8.02098 21.9166 7.52973 21.826 7.0625 21.5996C6.33518 21.2471 5.7312 20.6827 5.33105 19.9805C5.07401 19.5293 4.95083 19.0444 4.87305 18.5146C4.79705 17.997 4.75466 17.359 4.70312 16.5859L4.06445 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H21ZM6.69922 16.4531C6.75287 17.2579 6.78976 17.8037 6.85156 18.2246C6.91159 18.6334 6.98552 18.8431 7.06934 18.9902C7.26941 19.3413 7.57098 19.6236 7.93457 19.7998C8.08696 19.8736 8.30099 19.9331 8.71289 19.9658C9.13698 19.9995 9.68369 20 10.4902 20H13.5098C14.3163 20 14.863 19.9995 15.2871 19.9658C15.699 19.9331 15.913 19.8736 16.0654 19.7998C16.429 19.6236 16.7306 19.3413 16.9307 18.9902C17.0145 18.8431 17.0884 18.6334 17.1484 18.2246C17.2102 17.8037 17.2471 17.2579 17.3008 16.4531L17.9307 7H6.06934L6.69922 16.4531ZM15 2C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H9C8.44772 4 8 3.55228 8 3C8 2.44772 8.44772 2 9 2H15Z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
