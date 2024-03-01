import { z } from "zod";

export const teamsSchema = z.object({
    team_name: z.string().min(3).max(255),
    team_desc: z.string().max(255).optional(),
    team_code : z.string().min(6).max(32)
})