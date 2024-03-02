"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validator/auth";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import signUp, { UpdateProfile } from "@/api-caller/user";
import { SignupRequest } from "@/type/user";
import { TypedFormData, getTypedFormData } from "@/lib/CustomFormData";
import { useToast } from "@/components/ui/use-toast";
import { cn, isResponseError } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Interface } from "readline";
import { EditSchema } from "@/validator/editprofile";
// type Props = {};

type Profile1 = {
  user_id: number;
  username: string;
  dob: Date | string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
};

interface ProfileEdit {
  changeN: Profile1;
}

const ProfileEdit = ({
  user_id,
  username,
  bio,
  phone,
  token,
  avatar
}: Profile1 & { token: string }) => {
  console.log("another ", user_id);
  // console.log("another ", changeN.email);
  // console.log("another ", changeN);

  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const form = useForm<z.infer<typeof EditSchema>>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      username: username,
      phone: phone,
      bio: bio,
      avatar:
        "",
    },
  });

  const  handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log(selectedFile);
      //   // Handle the selected file (e.g., upload to server)
      const formData1 = new FormData();
      formData1.append("avatar", selectedFile);
      const response = await UpdateProfile(formData1, user_id.toString(), token);
      console.log(response);
      // for (let i = 0; i < event.target.files!.length; i++) {
      //   const file = event.target.files![i];
      //   useFileStore.getState().addFile({
      //     id: String(100000 * Math.random() * Math.random() * Date.now()),
      //     name: file.name,
      //     email: 'email',
      //     url: 'https://www.google.com/',
      //     createdAt: 'createdAt',
      //   });
      // }
    }
  };

  async function onSubmit(values: z.infer<typeof EditSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("PAss");
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("phone", values.phone);
    formData.append("bio", values.bio);
    const response = await UpdateProfile(formData, user_id.toString(), token);
    if (!isResponseError(response)) {
      toast({
        title: "Success!",
        description: "You have successfully signed up!",
        variant: "success",
      });
    } else {
      const { message, status, statusText } = response;
      toast({
        title: "Error Occured!",
        description: message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex flex-col h-full justify-center px-5  gap-4 w-1/2 ">
      <p className="text-xl font-bold text-center">Signup</p>
      <img
        className="md:h-[20rem] md:w-[20rem] sm:h-[24rem] sm:w-[24rem] border-2 rounded-3xl"
        src={
          avatar !== ""
            ? avatar
            : "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
        }
      />
      <input
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={handleFileSelected}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 px-[15%] relative space-x-8
						overflow-x-hidden
						"
        >
          <div
            className={cn(
              "space-y-3 transition-transform transform translate-x-0 ease-in-out duration-300 ",
              {
                "transform -translate-x-[140%]": formStep !== 0,
              }
            )}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={username} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>bio</FormLabel>
                  <FormControl>
                    <Input placeholder={bio} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input placeholder={phone} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* flex gap-2 relative pt-28 */}

          <Button type="submit">Submit</Button>
          {/* <Link s>
                <button>Go</button>
            </Link> */}
        </form>
      </Form>
    </div>
  );
};

export default ProfileEdit;
// function editprodile(formData: FormData) {
//   throw new Error("Function not implemented.");
// }
