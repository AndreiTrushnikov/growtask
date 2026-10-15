<?// Order Page ?>
<?php
//Хардкод для крошек и шапки
$page="Оформление заказа";
?>
<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Header/index.php'; ?>
<?php
include  $_SERVER['DOCUMENT_ROOT'] .  '/data.php';
?>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] .  '/Layout/Blocks/Breadcrumbs/index.php'; ?>

<div class="title-wrapper">
    <div class="container">
        <div class="title-block">
            <a href="/basket/" class="back-to-basket-btn back-to-cart-btn--desktop">
                <span class="back-to-basket-btn-icon btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#0D0D0D" d="M18.9998 13L7.41383 13L12.7068 18.293C13.0973 18.6835 13.0973 19.3165 12.7068 19.707C12.3163 20.0976 11.6833 20.0976 11.2927 19.707L4.29273 12.707L4.22437 12.6309C3.90402 12.2381 3.92662 11.6591 4.29273 11.293L11.2927 4.29297C11.6833 3.90244 12.3163 3.90244 12.7068 4.29297C13.0973 4.68349 13.0973 5.31651 12.7068 5.70703L7.41383 11L18.9998 11C19.5521 11 19.9998 11.4477 19.9998 12C19.9998 12.5523 19.5521 13 18.9998 13Z" />
                    </svg>
                </span>
                <span class="title-above">
                    В корзину
                </span>
            </a>
            <h3 class="title">
                Оформление заказа
            </h3>
        </div>
    </div>
</div>

<div class="order-wrapper">
    <div class="container">
        <div class="order">
            Оформление заказа
        </div>
    </div>
</div>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Footer/index.php'; ?>
