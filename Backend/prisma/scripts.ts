import { prisma } from "./lib/prisma";

async function main() {
    const user = await prisma.user.create({
      data: {
        email: "level",
        passwordHash: "password",
      }
    })
    const allUser = await prisma.user.findMany();
    console.log(allUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });