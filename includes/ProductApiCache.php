<?php

/**
 * Класс для получения данных и сохранения в файловый кеш
 */
class ProductApiCache {
    private string $cacheFile;
    private int $cacheDuration;
    private string $apiUrl;

    /**
     * @param string $cacheFile Путь к файлу кэша
     * @param int $cacheDuration Время жизни кэша в секундах
     * @param string $apiUrl URL внешнего API
     */
    public function __construct(
        string $cacheFile,
        int $cacheDuration = 3600,
        string $apiUrl = 'https://growtask.ru/test-front/api/products'
    ) {
        $this->cacheFile = $cacheFile;
        $this->cacheDuration = $cacheDuration;
        $this->apiUrl = $apiUrl;
    }

    /**
     * Получает данные: либо из кэша, либо делает запрос к API
     * @return array Массив с ключом 'data'
     */
    public function getData(): array {
        $cachedData = $this->getCache();

        // Если кэш свежий, возвращаем его сразу (запроса к API нет)
        if ($cachedData !== null) {
            return $cachedData;
        }

        // Если кэш устарел или отсутствует, делаем запрос к API
        $freshData = $this->fetchFromApi();

        if ($freshData !== null) {
            $this->saveCache($freshData);
            return $freshData;
        }

        // Fallback: если API недоступен, возвращаем устаревший кэш (если есть), чтобы страница не ломалась
        return $cachedData ?? ['data' => []];
    }

    private function getCache(): ?array {
        if (file_exists($this->cacheFile)) {
            $content = file_get_contents($this->cacheFile);
            $cacheData = json_decode($content, true);

            if (json_last_error() === JSON_ERROR_NONE && isset($cacheData['timestamp'])) {
                if (time() - $cacheData['timestamp'] < $this->cacheDuration) {
                    return $cacheData['data'];
                }
            }
        }
        return null;
    }

    private function fetchFromApi(): ?array {
        $ch = curl_init($this->apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            $apiResponse = json_decode($response, true);
            if (isset($apiResponse['data']) && is_array($apiResponse['data'])) {
                return ['data' => $apiResponse['data']];
            }
        }

        return null;
    }

    private function saveCache(array $data): void {
        $cacheDir = dirname($this->cacheFile);
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }

        file_put_contents($this->cacheFile, json_encode([
            'timestamp' => time(),
            'data' => $data
        ]));
    }
}