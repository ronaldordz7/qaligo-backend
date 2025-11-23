const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('EMAIL_EXISTS');

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "user"}
  });

  return user;
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('INVALID_CREDENTIALS');

  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role   
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  // Nunca devolver password al frontend
  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role     
  };

  return { user: safeUser, token };
}

module.exports = { register, login };
