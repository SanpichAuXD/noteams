import { z } from "zod";
const registerSchema = z.object({
    username: z.string().min(3).max(255),
    firstname: z.string().min(3).max(255),
    lastname: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
    cfpassword : z.string().min(8).max(255),
    email: z.string().email(),
    }).refine((data)=> {
        data.cfpassword === data.password;
    }, {
        message: "Password not match",
        path: ["cfpassword"],
    });
    

const loginSchema = z.object({
    email : z.string().email(),
    password: z.string().min(8).max(255),
    });


export {registerSchema, loginSchema};