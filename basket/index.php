<?// Basket Page ?>
<?php
//Хардкод для крошек и шапки
$page="Корзина";
?>
<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Header/index.php'; ?>
<?php
    include  $_SERVER['DOCUMENT_ROOT'] .  '/data.php';
?>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] .  '/Layout/Blocks/Breadcrumbs/index.php'; ?>

<div class="title-wrapper">
    <div class="container">
        <div class="title-block">
            <h3 class="title">
                Корзина
            </h3>
            <div class="basket-quantity bg-gray">
                0000 шт.
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="basket-wrapper">
        <div class="basket-items-wrapper">
            <div class="basket-buttons">
                <button type="button">1</button>
                <button type="button">2</button>
            </div>
            <div class="basket-items">
                <?php foreach ($data['data'] as $product) { ?>
                    <?php include  $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Basket/Card/index.php";?>
                <?php } ?>
            </div>
        </div>

        <?php include  $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Basket/BasketTotal/index.php";?>
    </div>
</div>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Footer/index.php'; ?>
