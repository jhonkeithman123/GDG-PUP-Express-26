// Request logger middleware — assigns `req.id` and logs start/finish with duration
export default function requestLogger(req, res, next) {
  req.id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  const start = process.hrtime();
  console.log(`[req:${req.id}] → ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const ms = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
    console.log(`[req:${req.id}] ← ${res.statusCode} ${ms}ms`);
  });
  next();
}
