<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$apiUrl = 'https://growtask.ru/test-front/api/products';

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'cURL error: ' . $error
    ]);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode([
        'success' => false,
        'error' => 'API returned HTTP ' . $httpCode
    ]);
    exit;
}

// Проверяем валидность JSON
$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid JSON from API'
    ]);
    exit;
}

// Возвращаем данные
echo json_encode([
    'success' => true,
    'data' => $data['data'] ?? []
]);