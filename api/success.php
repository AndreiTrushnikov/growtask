<?php
/**
 * /api/success.php — просто заглушка, псевдо-проверка формы
 * Всегда возвращает {"success": true, ...}
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

usleep(1000000);


/**
 * Приводит значение к «читаемому» виду:
 *  - строка, похожая на JSON-объект/массив — рекурсивно декодируется;
 *  - числовая строка (int/float) — приводится к числу;
 *  - остальное возвращается как есть.
 */
function normalizeValue($value)
{
    if (is_array($value)) {
        foreach ($value as $k => $v) {
            $value[$k] = normalizeValue($v);
        }
        return $value;
    }

    if (is_string($value)) {
        $trimmed = trim($value);

        // JSON-объект или JSON-массив
        if ($trimmed !== '' && ($trimmed[0] === '{' || $trimmed[0] === '[')) {
            $decoded = json_decode($trimmed, true);
            if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded))) {
                return normalizeValue($decoded);
            }
        }

        // Число
        if (is_numeric($trimmed)) {
            if (preg_match('/^-?\d+$/', $trimmed)) {
                return (int)$trimmed;
            }
            return (float)$trimmed;
        }

        return $value;
    }

    return $value;
}


// $_POST как есть (все поля, включая items, собранные PHP в массив)
$data = $_POST;

if (isset($data['items'])) {
    $data['items'] = normalizeValue($data['items']);
} else {
    $data['items'] = [];
}


http_response_code(200);
echo json_encode([
    'success' => true,
    'order_id' => 'order-' . date('Ymd-His') . '-' . random_int(1000, 9999),
    'message' => 'Заявка принята',
    'data' => $data,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);