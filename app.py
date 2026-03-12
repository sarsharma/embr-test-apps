from flask import Flask, render_template_string, jsonify
import redis
import os

app = Flask(__name__)

redis_host = os.environ.get("REDIS_HOST", "localhost")
redis_port = int(os.environ.get("REDIS_PORT", 6379))
r = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)

CLICK_KEY = "click_count"

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Click Counter</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 48px;
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        h1 { font-size: 24px; margin-bottom: 8px; }
        .subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 32px; }
        .count {
            font-size: 72px;
            font-weight: 700;
            color: #38bdf8;
            margin-bottom: 32px;
            font-variant-numeric: tabular-nums;
        }
        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 14px 40px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin: 0 8px;
        }
        button:hover { background: #1d4ed8; }
        button.reset {
            background: transparent;
            border: 1px solid #475569;
            color: #94a3b8;
        }
        button.reset:hover { border-color: #ef4444; color: #ef4444; }
        .footer {
            margin-top: 32px;
            font-size: 12px;
            color: #475569;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🖱️ Click Counter</h1>
        <p class="subtitle">Backed by Redis cache</p>
        <div class="count" id="count">{{ count }}</div>
        <div>
            <button onclick="click_it()">Click Me</button>
            <button class="reset" onclick="reset_it()">Reset</button>
        </div>
        <div class="footer">
            Flask + Redis · Stored at key: <code>{{ key }}</code>
        </div>
    </div>
    <script>
        async function click_it() {
            const res = await fetch('/click', { method: 'POST' });
            const data = await res.json();
            document.getElementById('count').textContent = data.count;
        }
        async function reset_it() {
            const res = await fetch('/reset', { method: 'POST' });
            const data = await res.json();
            document.getElementById('count').textContent = data.count;
        }
    </script>
</body>
</html>
"""


@app.route("/")
def index():
    count = r.get(CLICK_KEY) or 0
    return render_template_string(HTML_TEMPLATE, count=count, key=CLICK_KEY)


@app.route("/click", methods=["POST"])
def click():
    count = r.incr(CLICK_KEY)
    return jsonify(count=count)


@app.route("/reset", methods=["POST"])
def reset():
    r.set(CLICK_KEY, 0)
    return jsonify(count=0)


@app.route("/health")
def health():
    try:
        r.ping()
        return jsonify(status="healthy", redis="connected")
    except redis.ConnectionError:
        return jsonify(status="unhealthy", redis="disconnected"), 503


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
