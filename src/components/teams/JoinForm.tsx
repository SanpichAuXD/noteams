"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateTeamResponse, JoinTeamRequest } from "@/type/team"
import { TypedFormData, getTypedFormData } from "@/lib/CustomFormData"
import { getUserCookie } from "@/lib/utils"
import destr from "destr"
import { SignupRequest } from "@/type/user"
import { IFormattedErrorResponse } from "@/type/type"
import { joinTeams } from "@/api-caller/team"

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Code must be at least 6 characters long",
  }),
})

type Props = {
	token : string;
};

export function JoinForm({token}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
    },
  })
  const queryClient = useQueryClient()
  const mutation = useMutation< CreateTeamResponse,IFormattedErrorResponse>({
    mutationFn : async () => {
      const formData : TypedFormData<JoinTeamRequest> = getTypedFormData()
      const {user_id} = (destr<SignupRequest>(getUserCookie()))
      formData.append("team_code",form.getValues('code'))
      formData.append("user_id",user_id)
      const data = await joinTeams(token,formData)
      return data;
  },
  onSuccess : () => {
      console.log('success')
      queryClient.invalidateQueries({queryKey : [`hydrate-team`]})
  },
  onError : (error) => {
    toast({title : error.message})
  }
})
  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Code : </FormLabel>
              <FormControl>
                <Input placeholder="Enter your code" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
              )}
              />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
