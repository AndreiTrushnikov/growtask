<?php
/**
 * Проверка промокода. Принимает POST-запрос с JSON.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// Разрешаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Метод не разрешён',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$rawBody = file_get_contents('php://input');
$data    = json_decode($rawBody, true);

if (!is_array($data) || json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Некорректный JSON',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$code = isset($data['promocode']) ? trim((string) $data['promocode']) : '';

// Валидация
if ($code === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Введите промокод',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!preg_match('/^[A-Za-z0-9_-]{3,32}$/', $code)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Промокод содержит недопустимые символы',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$validPromocodes = [
    'GROWTASK2026'  => ['discount' => 50, 'type' => 'percent', 'message' => 'Скидка 10% применена'],
    'DISCOUNT'  => ['discount' => 100, 'type' => 'percent', 'message' => 'Скидка 100% применена'],
];

$upperCode = strtoupper($code);

if (!isset($validPromocodes[$upperCode])) {
    http_response_code(200);
    echo json_encode([
        'success' => false,
        'message' => 'Промокод не найден или недействителен',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$promo = $validPromocodes[$upperCode];

echo json_encode([
    'success'  => true,
    'message'  => $promo['message'],
    'promocode' => $upperCode,
    'discount' => $promo['discount'],
    'type'     => $promo['type'],
], JSON_UNESCAPED_UNICODE);