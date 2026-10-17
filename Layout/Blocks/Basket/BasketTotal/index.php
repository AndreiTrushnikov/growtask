<?// Basket Total ?>
<?php
global $page;
if ($page === 'Корзина') {
    $basketTitle = 'Ваша корзина:';
} else if ($page === 'Оформление заказа') {
    $basketTitle = 'Ваш заказ:';
} else {
    $basketTitle = 'Ваша корзина:';
}
?>
<div class="basket">
    <div class="basket-total">
        <div class="basket-total__title">
            <?=$basketTitle;?>
        </div>
        <div class="basket-total__results">
            <div class="basket-total__result skeleton">
                <span>
                    <span data-el="items-counter" data-type="with-word">0 товаров</span>:
                </span>
                <span>
                    <span data-el="total-sum-without-discount">0</span> ₽
                </span>
            </div>
            <span class="divider"></span>

            <div class="basket-total__result basket-total__result--discount skeleton">
                <span>Скидка:</span>
                <span>
                    <span data-el="total-discount">0</span> ₽
                </span>
            </div>
            <span class="divider"></span>

            <div class="basket-total__result basket-total__result--summary skeleton">
                <span>Итого:</span>
                <span>
                    <span data-el="total-sum">0</span> ₽
                </span>
            </div>
            <span class="divider"></span>
        </div>
        <?if ($page === 'Корзина') { ?>
            <a href="/order/" class="btn btn--accent btn--high w-100" data-el="to-order-btn">
                <span>К оформлению</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.00023 10.9999L16.5862 10.9999L11.2932 5.70696C10.9027 5.31643 10.9027 4.68342 11.2932 4.29289C11.6837
                    3.90237 12.3167 3.90237 12.7073 4.29289L19.7073 11.2929L19.7756 11.3691C20.096 11.7618 20.0734 12.3408 19.7073
                    12.707L12.7073 19.707C12.3167 20.0975 11.6837 20.0975 11.2932 19.707C10.9027 19.3164 10.9027 18.6834 11.2932
                    18.2929L16.5862 12.9999L5.00023 12.9999C4.44795 12.9999 4.00023 12.5522 4.00023 11.9999C4.00023 11.4476 4.44795
                    10.9999 5.00023 10.9999Z" fill="white"/>
                </svg>
            </a>
        <? } else { ?>
            <button  class="btn btn--accent btn--high w-100" type="submit" form="order-form" data-el="form-submit-btn">
                <span>Оформить заказ</span>
            </button>
        <? } ?>
    </div>

    <? include $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/PromocodeBlock/index.php'?>

</div>