import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@sensante.sn" },
    update: { password: hashed },
    create: {
      nom: "Admin",
      prenom: "Super",
      email: "admin@sensante.sn",
      password: hashed,
      role: "AGENT",
    },
  });

  console.log("Utilisateur créé :", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
