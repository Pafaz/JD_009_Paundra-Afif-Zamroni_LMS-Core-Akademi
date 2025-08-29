import { z } from "zod";

// Enum sesuai model
const StatusSessionEnum = z.enum(["PENDING", "APPROVED", "REJECTED"]);
const SessionMethodEnum = z.enum(["ONLINE", "OFFLINE"]);

// Schema untuk create Session
export const createSessionSchema = z.object({
    mentorId: z.number().int().positive("Mentor ID must be a positive integer"),
    studentId: z.number().int().positive("Student ID must be a positive integer"),
    date: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Date must be a valid datetime",
        }),
    method: SessionMethodEnum,
    link: z.string().url("Link must be a valid URL").optional().nullable(),
    status: StatusSessionEnum.optional().default("PENDING"),
}).refine(
    (data) => (data.method === "ONLINE" ? !!data.link : true),
    { message: "Link is required for ONLINE method", path: ["link"] }
);

// Schema untuk update Session
export const updateSessionSchema = z.object({
    id: z.number().int().positive("Session ID is required"),
    date: z
        .string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Date must be a valid datetime",
        }),
    method: SessionMethodEnum.optional(),
    link: z.string().url("Link must be a valid URL").optional().nullable(),
    status: StatusSessionEnum.optional(),
}).refine(
    (data) => (data.method === "ONLINE" ? !!data.link : true),
    { message: "Link is required for ONLINE method", path: ["link"] }
);
