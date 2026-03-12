# Click Counter — Flask + Redis

A simple test app: a click counter backed by Redis cache.

## Run Locally

```bash
pip install -r requirements.txt
# Make sure Redis is running on localhost:6379
python app.py
```

Open http://localhost:5000

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REDIS_HOST` | `localhost` | Redis server hostname |
| `REDIS_PORT` | `6379` | Redis server port |

## Endpoints

| Route | Method | Description |
|---|---|---|
| `/` | GET | Main page with click button |
| `/click` | POST | Increment counter, returns JSON |
| `/reset` | POST | Reset counter to 0 |
| `/health` | GET | Health check (tests Redis connection) |
