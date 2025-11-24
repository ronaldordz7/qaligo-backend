function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  console.log("🔍 HEADER:", header);

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const [scheme, token] = header.split(" ");
  console.log("🔍 TOKEN RECIBIDO:", token);

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 PAYLOAD DECODIFICADO:", payload); 
    req.user = payload;
    next();
  } catch (err) {
    console.error("❌ ERROR VERIFICANDO TOKEN:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
}


module.exports = authMiddleware;
