<?php
class JwtService {
    private $secretKey;
    private $algorithm;

    public function __construct($secretKey = 'your_secret_key_here', $algorithm = 'HS256') {
        $this->secretKey = $secretKey;
        $this->algorithm = $algorithm;
    }

    private function base64urlEncode($data) {
        $b64 = base64_encode($data);
        if ($b64 === false) {
            return false;
        }
        $url = strtr($b64, '+/', '-_');
        return rtrim($url, '=');
    }

    private function base64urlDecode($data) {
        $b64 = strtr($data, '-_', '+/');
        switch (strlen($b64) % 4) {
            case 2: $b64 .= '=='; break;
            case 3: $b64 .= '='; break;
        }
        return base64_decode($b64);
    }

    public function encode($payload) {
        $header = ['typ' => 'JWT', 'alg' => $this->algorithm];
        $headerStr = json_encode($header);
        $payloadStr = json_encode($payload);

        $base64UrlHeader = $this->base64urlEncode($headerStr);
        $base64UrlPayload = $this->base64urlEncode($payloadStr);

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secretKey, true);
        $base64UrlSignature = $this->base64urlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public function decode($jwt) {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return false;
        }

        list($header64, $payload64, $signature64) = $parts;

        $header = json_decode($this->base64urlDecode($header64), true);
        if ($header === null || empty($header['alg']) || $header['alg'] !== $this->algorithm) {
            return false;
        }

        $signature = $this->base64urlDecode($signature64);
        $expectedSignature = hash_hmac('sha256', $header64 . "." . $payload64, $this->secretKey, true);

        if (!hash_equals($expectedSignature, $signature)) {
            return false;
        }

        $payload = json_decode($this->base64urlDecode($payload64), true);
        
        // check exp 
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;
        }

        return $payload;
    }
}
?>
