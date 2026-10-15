<?// Cart Page ?>
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
            <div class="cart-quantity bg-gray">
                0000 шт.
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="cart-listing">
        <?php foreach ($data['data'] as $product) { ?>
            <?php include  $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Cart/Card/index.php";?>
        <?php } ?>
    </div>
</div>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Footer/index.php'; ?>
