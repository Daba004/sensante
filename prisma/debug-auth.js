require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = await prisma.user.findMany();

  console.log("\n=== Utilisateurs en base ===");
  for (const u of users) {
    const isBcrypt = u.password.startsWith("$2b$") || u.password.startsWith("$2a$");
    console.log(`email: ${u.email}`);
    console.log(`password (20 premiers chars): ${u.password.substring(0, 20)}`);
    console.log(`est un hash bcrypt: ${isBcrypt}`);
    if (isBcrypt) {
      const test = await bcrypt.compare("admin123", u.password);
      console.log(`bcrypt.compare("admin123"): ${test}`);
    }
    console.log("---");
  }

  // Réinitialise tous les mots de passe à "admin123"
  console.log("\n=== Mise à jour des mots de passe ===");
  for (const u of users) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.user.update({ where: { id: u.id }, data: { password: hashed } });
    console.log(`✓ ${u.email} → mot de passe réinitialisé à "admin123"`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
