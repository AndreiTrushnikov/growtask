<?// Order Page ?>
<?php
//Хардкод для крошек и шапки
$page="Оформление заказа";
?>
<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Header/index.php'; ?>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] .  '/Layout/Blocks/Breadcrumbs/index.php'; ?>

<div class="title-wrapper">
    <div class="container">
        <div class="title-block">
            <a href="/basket/" class="back-to-basket-btn back-to-basket-btn--desktop">
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

<div class="container">
    <div class="order-wrapper">
        <div class="order">
            <form action="" name="ORDER_FORM" id="order_form" class="order-form">
                <?php include $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Order/Slider/index.php";?>
                <?php include $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Order/Customer/index.php";?>
                <?php include $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Order/Payment/index.php";?>
                <div class="line above-order-block-total-line"></div>
                <div class="order-block-total">
                    <a href="/basket/" class="btn btn--accent btn--high btn--big-padding w-fit">
                        <span>Оформить заказ</span>
                    </a>
                    <div class="order-block-total-info">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12ZM11 16V12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16ZM12.0098 7C12.5621 7 13.0098 7.44772 13.0098 8C13.0098 8.55228 12.5621 9 12.0098 9H12C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7H12.0098ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" fill="#404040"/>
                        </svg>
                        <p>
                            Вы указали все необходимые данные, теперь можно оформить заказ
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <?php include  $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Basket/BasketTotal/index.php";?>
    </div>
</div>
<script src="script.js"></script>
<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Footer/index.php'; ?>
