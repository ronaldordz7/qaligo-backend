require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5500",
    "https://magical-swan-c1ea78.netlify.app",
    "https://qaligo-backend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: [
    "Authorization"
  ],
  credentials: true
}));

app.use(express.json());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Qaligo API' });
});

// Solo levanta servidor si no estamos en testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Q'aliGo backend corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para testing, despliegue serverless u otros
module.exports = app;
