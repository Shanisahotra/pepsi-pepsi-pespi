import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Function to connect DB (optional but good practice)
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export default prisma;