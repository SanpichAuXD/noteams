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
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  avatar,
}: Profile1 & { token: string }) => {
  console.log("another ", user_id);

  const router = useRouter();

  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const form = useForm<z.infer<typeof EditSchema>>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      username: username,
      phone: phone,
      bio: bio,
      avatar: "",
    },
  });

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log(selectedFile);
      //   // Handle the selected file (e.g., upload to server)
      const formData1 = new FormData();
      formData1.append("avatar", selectedFile);
      const response = await UpdateProfile(
        formData1,
        user_id.toString(),
        token
      );
      console.log(response);
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
    const timeoutId = setTimeout(() => {
      // Your logic here
      router.refresh();
      console.log('Timeout completed after route change');
    }, 1);

  //   router.refresh();
    router.push('/profile');
  }
  return (
    <div className="flex justify-center">
      <div className="mt-10">
        <div className="items-center">
          <p className="text-3xl font-bold text-center ">Signup</p>
        </div>
        <div className="grid grid-cols-2 bg-slate-400 mt-10 rounded-3xl">
          <div>
            <div className="m-10 p-10">
              <Image
                className="md:h-[20rem] md:w-[20rem] sm:h-[24rem] sm:w-[24rem] border-2 rounded-3xl bg-white p-5"
                width={50}
                height={50}
                src={avatar !== "" ? avatar : "/profile1.png"}
                alt="Picture of the Profile"
              />
              <input
                className="mt-5 "
                type="file"
                accept=".jpg, .png, .jpeg"
                onChange={handleFileSelected}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className=" border-2 border-gray-600">

            </div>
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
                <div className="mt-5">

                </div>
                <Button type="submit">Submit</Button>
                <Link href={"/profile"}>
                <Button>Cancel</Button>
                </Link>
                {/* <Link s>
                <button>Go</button>
            </Link> */}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
// function editprodile(formData: FormData) {
//   throw new Error("Function not implemented.");
// }
