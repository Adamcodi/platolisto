import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding demo recipes...')
  // Store demo recipes as a JSON blob in a singleton table? We'll use Menu generation from a JSON file in src/lib
  // Nothing to seed for now.
}

main().catch((e)=>{console.error(e); process.exit(1)}).finally(()=>prisma.$disconnect())
