import cron from "node-cron";
import prisma from "../utils/prisma.js";

cron.schedule("0 0 * * *", async () => {
    try {
        const result = await prisma.session.deleteMany({
            where: {
                status: "REJECTED",
                createdAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            },
        });
        console.log(`Cleanup done, deleted ${result.count} sessions`);
    } catch (err) {
        console.error("Cron cleanup error:", err);
    }
});
