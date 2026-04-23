<?php

return [

    'paths' => ['api/*', 'admin/*', '*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',
        'https://thu2chieunhom3xdpmw.netlify.app',
        'https://cozy-biscotti-2fed1f.netlify.app'
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];