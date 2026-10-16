<?php
header('Content-Type: application/json');
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/ProductApiCache.php';

$apiCache = new ProductApiCache(
    $_SERVER['DOCUMENT_ROOT'] . '/cache/products_cache.json',
    3600,
    'https://growtask.ru/test-front/api/products'
);

$data = $apiCache->getData();

// Рендерим и кешируем шаблон
ob_start();
if (!empty($data['data'])) {
    foreach ($data['data'] as $product) {
        include $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Basket/Card/index.php";
    }
} else {
    echo '<p>Товары не найдены</p>';
}
$html = ob_get_clean();

echo json_encode([
    'success' => true,
    'html' => $html
]);