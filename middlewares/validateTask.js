// Validation middleware for todo routes
export function validateCreate(req, res, next) {
  const task = typeof req.body.task === "string" ? req.body.task.trim() : "";
  if (!task) return res.status(400).json({ error: "Task is required" });
  // normalize
  req.body.task = task;
  next();
}

export function validateUpdate(req, res, next) {
  if (req.body.task !== undefined) {
    if (typeof req.body.task !== "string")
      return res.status(400).json({ error: "Task must be a string" });
    const t = req.body.task.trim();
    if (!t) return res.status(400).json({ error: "Task cannot be empty" });
    req.body.task = t;
  }
  // validate id param
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0)
    return res.status(400).json({ error: "Invalid id" });
  next();
}
