const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Bowl de Quinoa y Pollo",
        description: "Quinoa, pollo a la plancha, verduras frescas, salsa ligera.",
        price: 18.90,
        category: "Bowl",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
      },
      {
        name: "Wrap Vegano",
        description: "Wrap con hummus, palta, tomate y vegetales.",
        price: 15.50,
        category: "Wrap",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
      },
      {
        name: "Ensalada Detox",
        description: "Espinaca, pepino, palta, semillas y limón.",
        price: 14.00,
        category: "Ensalada",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
      },
      {
        name: "Bowl Proteico",
        description: "Arroz integral, carne magra o tofu, verduras salteadas.",
        price: 22.00,
        category: "Bowl",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
      }
    ]
  });

  console.log("✔ Productos insertados correctamente!");
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
