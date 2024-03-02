import { z } from "zod";
const EditSchema = z.object({
    username: z.string().max(255),
    bio: z.string().max(255),
    phone: z.string().max(10).regex(/^[0-9]+$/, "Please enter a valid phone number"),
    avatar: z.string().max(255),
    // email: z.string().email(),
    });


export {EditSchema};