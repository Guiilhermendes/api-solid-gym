import 'dotenv/config'
import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto'
import { afterAll, afterEach, beforeAll } from 'vitest'

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL env variable');
    }

    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);
    return url.toString();
}

const schema = randomUUID();
const databaseUrl = generateDatabaseUrl(schema);

// Define o DATABASE_URL ANTES de qualquer import que use o Prisma
process.env.DATABASE_URL = databaseUrl

beforeAll(async () => {
    execSync('npx prisma db push --skip-generate', {
        env: {
            ...process.env,
            DATABASE_URL: databaseUrl,
        }
    });
});

afterEach(async () => {
    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
    })
    
    // Limpa todas as tabelas após cada teste
    await prisma.checkIn.deleteMany()
    await prisma.user.deleteMany()
    
    await prisma.$disconnect()
})

afterAll(async () => {
    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
    })
    
    await prisma.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
    )

    await prisma.$disconnect()
});
