<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Получаем данные из POST запроса
$input = file_get_contents('php://input');
$request = json_decode($input, true);

if (!$request || !isset($request['data']) || !is_array($request['data'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid request data'
    ]);
    exit;
}

$data = ['data' => $request['data']];

// Рендерим HTML
ob_start();
if (!empty($data['data'])) {
    foreach ($data['data'] as $product) {
        include $_SERVER['DOCUMENT_ROOT'] . "/Layout/Blocks/Order/Card/index.php";
    }
} else {
    echo '<p>Корзина пуста</p>';
}
$html = ob_get_clean();

echo json_encode([
    'success' => true,
    'html' => $html
]);