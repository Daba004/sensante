require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("\n=== Utilisateurs en base ===");
  for (const u of users) {
    const isBcrypt = u.password.startsWith("$2b$") || u.password.startsWith("$2a$");
    console.log(`- ${u.email} | role: ${u.role} | hash bcrypt: ${isBcrypt} | password: ${u.password.substring(0, 20)}...`);
  }

  // Réinitialise le mot de passe de tous les users avec "admin123"
  console.log("\n=== Mise à jour des mots de passe ===");
  for (const u of users) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.user.update({ where: { id: u.id }, data: { password: hashed } });
    console.log(`✓ ${u.email} → mot de passe réinitialisé à "admin123"`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
