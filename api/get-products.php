<?php
header('Content-Type: application/json');
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/ProductApiCache.php';

$apiCache = new ProductApiCache(
    $_SERVER['DOCUMENT_ROOT'] . '/cache/products_cache.json',
    3600,
    'https://growtask.ru/test-front/api/products'
);

$data = $apiCache->getData();

echo json_encode([
    'success' => true,
    'data' => $data['data'] ?? []
]);