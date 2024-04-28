import prisma from ".";

const load = async () => {
  try {

  } catch (e) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
