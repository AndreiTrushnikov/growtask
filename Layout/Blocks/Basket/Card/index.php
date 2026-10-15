<?// Card ?>

<div class="basket-item-wrapper">
    <div class="basket-item">
        <div class="basket-item__image">
            <? if (!empty($product['image'])) {
                $path = $product['image'];
                $name = $product['name'];
            } else {
                $path = '/assets/noimage.png';
                $name = 'Нет изображения';
            } ?>
            <img src="<?= $path; ?>" alt="<?= $name; ?>" title="<?= $name; ?>">
        </div>
        <div class="basket-item__name">
            <?= $product['name']; ?>
        </div>
    </div>
</div>
