<?php
class CloudinaryService {
    private $cloudName = 'ddgyfw3gr';
    private $apiKey = '162939833714192';
    private $apiSecret = 'BexXe40IVJ-OKCMDdUeipYc401k';

    public function uploadImage($tmpFilePath) {
        $timestamp = time();
        // The parameters to sign must be sorted alphabetically. Here we only have 'timestamp'
        // If we added 'folder' it would be 'folder=something&timestamp='.$timestamp.$apiSecret
        $stringToSign = "timestamp=" . $timestamp . $this->apiSecret;
        $signature = sha1($stringToSign);

        $url = "https://api.cloudinary.com/v1_1/" . $this->cloudName . "/image/upload";

        $cfile = new CURLFile($tmpFilePath);

        $postFields = array(
            'file' => $cfile,
            'api_key' => $this->apiKey,
            'timestamp' => $timestamp,
            'signature' => $signature
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Sometimes Windows local environments have SSL issues, so we can set this, but strictly in production SSL should be verified.
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
            return false;
        }

        $data = json_decode($response, true);
        return $data['secure_url'] ?? false;
    }
}
?>
