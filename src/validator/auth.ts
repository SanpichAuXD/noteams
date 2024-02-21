import { z } from "zod";
const registerSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(8).max(255),
    cfpassword : z.string().min(8).max(255),
    phone : z.string().min(10).max(10).regex(/^[0-9]+$/, "Please enter a valid phone number"),
    birth_day: z.string().min(1).max(2).regex(/^[0-9]+$/, "Please enter a valid date"),
    birth_month: z.string().min(1).max(2).regex(/^[0-9]+$/, "Please enter a valid month"),
    birth_year: z.string().min(4).max(4).regex(/^[0-9]+$/, "Please enter a valid year"),
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