<?// Card ?>

<div class="card">
    <div class="card__image">\
        <? if (!empty($product['image'])) {
            $path = $product['image'];
            $name = $product['name'];
        } else {
            $path = '/assets/noimage.png';
            $name = 'Нет изображения';
        } ?>
        <img src="<?= $path; ?>" alt="<?= $name; ?>" title="<?= $name; ?>">
    </div>
    <div class="card__name">
        <?= $product['name']; ?>
    </div>
</div>
