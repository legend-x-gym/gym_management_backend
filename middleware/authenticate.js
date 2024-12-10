const authenticateRole = function (req, res, next) {
  const authHeader = req.authorization;
  const token = authHeader && authHeader.split()[1];

  if (!token) return res.json({ res: "Access token required" });
};

export { authenticateRole };
