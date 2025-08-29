import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash.js';

const prisma = new PrismaClient();

async function main() {
    const password = await hashPassword('king.mentor');
    const mentor = await prisma.user.upsert({
        where: { email: 'mentor1@company.com' },
        update: {},
        create: {
            name: 'Mentor Utama',
            email: 'mentor1@company.com',
            password: password, 
            role: 'MENTOR', 
        },
    });

    console.log('✅ Mentor berhasil dibuat:', mentor);
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
