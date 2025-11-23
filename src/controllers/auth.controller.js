const authService = require('../services/auth.service');

async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role});
  } catch (err) {
    if (err.message === 'EMAIL_EXISTS') {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }
    console.error(err);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
}

async function login(req, res) {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role} });
  } catch (err) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    console.error(err);
    res.status(500).json({ message: 'Error iniciando sesión' });
  }
}

module.exports = { register, login };
