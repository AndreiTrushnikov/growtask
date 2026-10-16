<?php
/**
 * Карточка товара на странице оформления заказа.
 *
 * Доступные переменные:
 * @var array|null $product - детали товара из products_data из localstorage
 */

?>
    <? if (!empty($product['image'])) {
        $path = $product['image'];
        $name = $product['name'];
    } else {
        $path = '/assets/noimage.png';
        $name = 'Нет изображения';
    } ?>
        <div class="order-item">
            <div class="order-item__quantity">
                <?= $product['quantity']; ?>
            </div>
            <div class="order-item__image">
                <img src="<?= $path; ?>" alt="<?= $name; ?>" title="<?= $name; ?>">
            </div>
        </div>
