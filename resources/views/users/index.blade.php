<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Danh sách thành viên</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'DM Sans', sans-serif;
            min-height: 100vh;
            background: #0a0a0a;
            color: #fff;
            padding: 60px 20px;
        }
        .users-header {
            text-align: center;
            margin-bottom: 60px;
        }
        .users-header h1 {
            font-family: 'Syne', sans-serif;
            font-size: clamp(2.5rem, 6vw, 5rem);
            font-weight: 800;
            letter-spacing: -2px;
            background: linear-gradient(135deg, #ff6b35, #f7c59f, #ff6b35);
            background-size: 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }
        .users-header p {
            color: #666;
            font-size: 1rem;
            margin-top: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 300;
        }
        .users-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 20px;
            max-width: 1100px;
            margin: 0 auto;
        }
        .user-card {
            background: #111;
            border: 1px solid #222;
            border-radius: 16px;
            padding: 28px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            animation: fadeUp 0.5s ease both;
        }
        .user-card:nth-child(1) { animation-delay: 0.1s; }
        .user-card:nth-child(2) { animation-delay: 0.2s; }
        .user-card:nth-child(3) { animation-delay: 0.3s; }
        .user-card:nth-child(4) { animation-delay: 0.4s; }
        .user-card:nth-child(5) { animation-delay: 0.5s; }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .user-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, #ff6b35, #f7c59f);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .user-card:hover {
            border-color: #333;
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .user-card:hover::before { opacity: 1; }
        .user-avatar {
            width: 56px;
            height: 56px;
            border-radius: 14px;
            background: linear-gradient(135deg, #ff6b35, #f7c59f);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 1.4rem;
            color: #000;
            margin-bottom: 16px;
        }
        .user-id {
            font-size: .72rem;
            color: #ff6b35;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 6px;
        }
        .user-name {
            font-family: 'Syne', sans-serif;
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            line-height: 1.3;
        }
        .user-count {
            text-align: center;
            margin-top: 50px;
            color: #333;
            font-size: .85rem;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .user-count span { color: #ff6b35; font-weight: 700; }
    </style>
</head>
<body>
    <div class="users-header">
        <h1>Thành Viên</h1>
        <p>Danh sách người dùng hệ thống</p>
    </div>

    <div class="users-grid">
        @foreach($users as $user)
        <div class="user-card">
            <div class="user-avatar">
                {{ strtoupper(substr($user->name, 0, 1)) }}
            </div>
            <div class="user-id"># {{ str_pad($user->id, 3, '0', STR_PAD_LEFT) }}</div>
            <div class="user-name">{{ $user->name }}</div>
        </div>
        @endforeach
    </div>

    <div class="user-count">
        Tổng cộng <span>{{ $users->count() }}</span> thành viên
    </div>
</body>
</html>