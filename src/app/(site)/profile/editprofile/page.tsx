import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalConfirm from "@/components/profilecomponent/savemodal";
import { cookies } from "next/headers";
import { cn, formatCookie } from "@/lib/utils";
import { SignupRequest } from "@/type/user";
import { GetProfile } from "@/api-caller/user";
import destr from "destr";
import { TypedFormData, getTypedFormData } from "@/lib/CustomFormData";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProfileEdit from "@/components/profilecomponent/profileedit";

type Profile1 = {
  user_id: number;
  username: string;
  dob: Date | string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
};

type Team1 = {
  team_id: string;
  teamName: string;
  team_poster: string;
  role: string;
};

type Profileandteam = {
  pData1: Profile1;
};

function onSubmit() {
  const formData: TypedFormData<SignupRequest> =
    getTypedFormData<SignupRequest>();
}
type Props = {};
// const EditProfile = (props: Props, pData1: any) => {
//   const { toast } = useToast();
//   const [formStep, setFormStep] = useState(0);
//   const form = useForm<z.infer<typeof registerSchema>>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       cfpassword: "",
//       phone: "",
//       dob: new Date(),
//     },
//   });

//   const ValidateBeforeNext = async () => {
//     // Trigger validation for the relevant fields
//     console.log(formStep, "formStep");
//     if (formStep == 0) {
//       await form.trigger(["username", "email"]);
//       const usernameState = form.getFieldState("username");
//       const emailState = form.getFieldState("email");
//       if (
//         usernameState.invalid ||
//         emailState.invalid ||
//         !usernameState.isDirty ||
//         !emailState.isDirty
//       ) {
//         return;
//       }
//       setFormStep(formStep + 1);
//     } else if (formStep == 1) {
//       await form.trigger(["dob", "phone"]);
//       const dobState = form.getFieldState("dob");
//       const phoneState = form.getFieldState("phone");
//       if (
//         dobState.invalid ||
//         phoneState.invalid ||
//         !dobState.isDirty ||
//         !phoneState.isDirty
//       ) {
//         return;
//       }
//       setFormStep(formStep + 1);
//     }
//   };
//   async function onSubmit(values: z.infer<typeof registerSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     const formData: TypedFormData<SignupRequest> =
//       getTypedFormData<SignupRequest>();
//     const date = values.dob
//       .toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       })
//       .split("/");
//     formData.append("username", values.username);
//     formData.append("email", values.email);
//     formData.append("password", values.password);
//     formData.append("dob", `${date[2]}-${date[0]}-${date[1]}`);
//     formData.append("phone", values.phone);
//     const response = await signUp(formData);
//     if (!isResponseError(response)) {
//       toast({
//         title: "Success!",
//         description: "You have successfully signed up!",
//         variant: "success",
//       });
//     } else {
//       const { message, status, statusText } = response;
//       toast({
//         title: "Error Occured!",
//         description: message,
//         variant: "destructive",
//       });
//     }
//   }
//   return (
//     <div className="flex flex-col h-full justify-center px-5  gap-4 w-1/2 ">
//       <p className="text-xl font-bold text-center">Signup</p>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-2 px-[15%] relative space-x-8
// 						overflow-x-hidden
// 						"
//         >
//           <div
//             className={cn(
//               "space-y-3 transition-transform transform translate-x-0 ease-in-out duration-300 ",
//               {
//                 "transform -translate-x-[140%]": formStep !== 0,
//               }
//             )}
//           >
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your username" {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your email" {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div
//             className={cn(
//               "space-y-3 mb-5 px-[15%] absolute  top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
//               {
//                 "transform translate-x-full ": formStep !== 1,
//               },
//               {
//                 "transform -translate-x-[140%]": formStep >= 2,
//               }
//             )}
//           >
//             {/* birthday */}
//             <FormField
//               control={form.control}
//               name="dob"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Year</FormLabel>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Enter your phone number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div
//             className={cn(
//               "space-y-3 mb-5 px-[15%] absolute  top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
//               {
//                 "transform translate-x-full ": formStep !== 2,
//               },
//               {
//                 "transform -translate-x-full": formStep >= 3,
//               }
//             )}
//           >
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <PasswordInput
//                       placeholder="Enter your password"
//                       {...field}
//                     />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="cfpassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <PasswordInput
//                       placeholder="Enter your password"
//                       {...field}
//                     />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div
//             className={cn("flex justify-between relative pt-14 ", {
//               "justify-end": formStep == 0,
//             })}
//           >
//             {/* flex gap-2 relative pt-28 */}
//             <Button
//               type="button"
//               variant={"ghost"}
//               onClick={() => {
//                 setFormStep(formStep - 1);
//               }}
//               className={cn({
//                 hidden: formStep == 0,
//               })}
//             >
//               Go Back
//             </Button>
//             <Button
//               type="submit"
//               className={cn({
//                 hidden: formStep !== 2,
//               })}
//             >
//               Register
//             </Button>

//             <Button
//               type="button"
//               variant={"outline"}
//               className={cn("text-end", {
//                 hidden: formStep == 2,
//               })}
//               onClick={() => ValidateBeforeNext()}
//             >
//               Next
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Button>
//           </div>
//           <p className="text-center pt-5">
//             Already Have Account ?{" "}
//             <Link href={"/signin"} className="font-bold">
//               {" "}
//               Login
//             </Link>
//           </p>
//         </form>
//       </Form>
//     </div>
//   );
// };

async function editprofileApp() {
  const token = cookies().get("accessToken")?.value!;
  const users = cookies().get("user")?.value!;

  const cookie = formatCookie(users);
  const { user_id } = destr<SignupRequest>(cookie);
  // const { user_iw } = destr<SignupRequest>(cookie);

  const data = await GetProfile(token, user_id);
  // const profile01: Profile1[] = [
  //   {
  //     userid: 1,
  //     username: "Peter1234",
  //     dob: "12-12-2002",
  //     bio: "bio XD",
  //     phone: "0944215180",
  //     email: "peter1234@gmail.comm",
  //     avatar:
  //       "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
  //   },
  // ];

  const teamprofile01: Team1[] = [
    {
      team_id: "T00001",
      teamName: "team1",
      team_poster:
        "https://media.licdn.com/dms/image/D4E12AQFP9XcUm3C_Fw/article-cover_image-shrink_600_2000/0/1684536742731?e=2147483647&v=beta&t=-87dzXNxDzNHcI-b69NtYenHzRCnjprXWM_Jq1JD1LM",
      role: "Owner",
    },
    {
      team_id: "T00002",
      teamName: "team2",
      team_poster:
        "https://www.proofhub.com/articles/wp-content/uploads/2019/07/Why-Bigger-Team-Isn%E2%80%99t-Always-the-Better-Choice.jpeg",
      role: "Member",
    },
  ];

  return (
    <div>
      {/* <EditProfile pData1={data.data} /> */}
      <ProfileEdit {...data.data} token={token}  />
    </div>
  );
}

export default editprofileApp;
