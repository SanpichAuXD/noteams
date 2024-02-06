import { z } from "zod";
const registerSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
    cfpassword : z.string().min(8).max(255),
    email: z.string().email(),
    }).superRefine(({ cfpassword, password }, ctx) => {
        console.log(cfpassword, password)
        if (cfpassword !== password) {
          ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["cfpassword"],
          });
        }
      });
    

const loginSchema = z.object({
    email : z.string().email(),
    password: z.string().min(8).max(255),
    });


export {registerSchema, loginSchema};