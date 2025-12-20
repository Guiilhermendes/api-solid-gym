import 'dotenv/config'
import { PrismaClient } from 'generated/prisma';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL env variable');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    return url.toString();
}

const prismaEnvironment: Environment = {
    name: 'prisma',
    async setup() {
        //Create DB
        const schema = randomUUID();
        const databaseUrl = generateDatabaseUrl(schema);

        process.env.DATABASE_URL = databaseUrl

        execSync('npx prisma db push --skip-generate', {
            env: {
                ...process.env,
                DATABASE_URL: databaseUrl,
            }
        });

        return {
            async teardown() {
                //Delete DB
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
                )

                await prisma.$disconnect()
            }
        } 
    }
}

export default prismaEnvironment