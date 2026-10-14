<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Тестовое задание на позицию Junior Frontend Developer в компанию Growtask</title>
    <link rel="stylesheet" href="/assets/fonts/fonts.css">
    <link rel="stylesheet" href="/Layout/assetsGlobal/normalize.css">
    <link rel="stylesheet" href="/Layout/assetsGlobal/style.css">
</head>
<body>

<div class="container">
    <header>
        <div class="header">
            <div class="header-adaptive">
                Корзина
            </div>
            <a href="/" class="header__logo">
                <img src="/assets/icons/logo.svg" alt="Logo">
            </a>
            <div class="header__basket">
                <?php require_once './Layout/Blocks/SmallBasket/index.php'; ?>
            </div>
        </div>
    </header>
    <div class="header-line"></div>
</div>