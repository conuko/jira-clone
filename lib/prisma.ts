import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prisma;
} else {
  if (!prisma) {
    throw new Error("Prisma client not initialized");
  }
}

export default prisma;
