<?// Order Page ?>
<?php
//Хардкод для крошек и шапки
$page="Успешный заказ";
?>
<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Header/index.php'; ?>
<?php
include  $_SERVER['DOCUMENT_ROOT'] .  '/data.php';
?>

<?php require_once  $_SERVER['DOCUMENT_ROOT'] .  '/Layout/Blocks/Breadcrumbs/index.php'; ?>

<div class="success-page-wrapper">
    <div class="container">
        <div class="success-page">
            <div class="success-page__icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.4885 12.155C31.1394 11.5041 32.1944 11.5041 32.8453 12.155C33.4961 12.8058 33.4961 13.8609
                     32.8453 14.5117L17.8453 29.5117C17.1944 30.1626 16.1394 30.1626 15.4885 29.5117L7.15515 21.1784C6.50427
                      20.5275 6.50427 19.4725 7.15515 18.8216C7.80602 18.1708 8.86104 18.1708 9.51192 18.8216L16.6669
                      25.9766L30.4885 12.155Z" fill="#0E8C0E"/>
                </svg>
            </div>
        </div>
    </div>
</div>



<?php require_once  $_SERVER['DOCUMENT_ROOT'] . '/Layout/Blocks/Footer/index.php'; ?>
