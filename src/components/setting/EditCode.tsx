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
import { updateCodeTeam } from "@/api-caller/team"

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
})

type Props = { 
    code : string
    token :string
    team_id :string
}
export function CodeInputForm({code, token,team_id } : Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: code,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(form.formState.isDirty)
    if(!form.formState.isDirty){
        toast({
            title: "Please Edit Code",
            description: "Code is the same as before",
          })
        }
        else{
          try{
            const res = await updateCodeTeam({token, team_id, team_code: data.code})
            console.log(res)
          }catch(error){
            console.log(error)
          }
          
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code Team</FormLabel>
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
