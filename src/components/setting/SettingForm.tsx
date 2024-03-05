"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTeamContext } from "@/context/TeamsContext";
import { CreateTeamResponse, GetSettingResponse, TeamRequest, TeamSetting } from '@/type/team'
import { useToast } from '../ui/use-toast'
import { updateTeamProfile } from '@/api-caller/team'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { IFormattedErrorResponse } from '@/type/type'
type SettingFormProps = {
      token:string;
     team : CreateTeamResponse & {team_desc : string}; 
     role: 'MEMBER' | "OWNER"
}
const teamSchema = z.object({
    name: z.string().max(30),
    description : z.string().max(100)
  })
  
const SettingForm = ({token,team,role}: SettingFormProps) => {
  const {toast} = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation<string,AxiosError<IFormattedErrorResponse>,  FormData>({
    mutationFn : async (formData) => {
      const {data} = await updateTeamProfile({token:token, formData : formData ,team_id: team.team_id})
        return data;
    },
    onSuccess : () => {
        console.log('success')
        queryClient.invalidateQueries({queryKey : [`team-${team.team_id}`]})
    },
onError : (error) => {
  console.log(error.response?.data.message)
  toast({title : error.response?.data.message})
}
    
});
    const form = useForm<z.infer<typeof teamSchema>>({
        resolver: zodResolver(teamSchema),
        defaultValues: {
          name: team.team_name,
          description : team.team_desc
        },
      })
      async function onSubmit(values: z.infer<typeof teamSchema>) {
        // Do something with the form values.
        const formData = new FormData()
        // ✅ This will be type-safe and validated.
        if(!form.formState.isDirty){
          toast({
            title: "Please Edit",
            description: "Value is the same as before",
          })
        }
        else{
          formData.append("team_name",values.name)
          formData.append("team_desc",values.description)
            mutation.mutate(formData)
        }
        }
      
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="name" disabled={role === 'MEMBER'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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

export default SettingForm