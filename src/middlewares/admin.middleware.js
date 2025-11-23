function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol admin." });
  }
  next();
}

module.exports = requireAdmin;
