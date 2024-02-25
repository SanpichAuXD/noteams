import { z } from "zod";

export const teamsSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().max(255).optional(),
    code : z.string().min(6).max(6)
})