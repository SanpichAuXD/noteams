"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import { Checkbox } from '../ui/checkbox'
import { GetTeamType, TeamSetting } from '@/type/team'
import { UpdateTeamPermission } from '@/api-caller/team'
import { toast } from 'sonner'
import { useToast } from '../ui/use-toast'
import { IFormattedErrorResponse } from '@/type/type'
import { useQueryClient } from '@tanstack/react-query'
type Props = {
    allow : TeamSetting
    token: string;
    team_id : string
}


const FormSchema = z.object({
    task: z.boolean().default(false).optional(),
    file: z.boolean().default(false).optional(),
    invite: z.boolean().default(false).optional(),
  })

const SettingPermission = ({allow, token,team_id}: Props) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          task: allow.allow_task,
          file: allow.allow_file,
          invite: allow.allow_invite,
        },
      })
      const {toast} = useToast()
      const queryClient = useQueryClient()
      const teamData = queryClient.getQueryData<GetTeamType>([`team-${team_id}`]);
      const role = teamData ? teamData!.user_role : 'MEMBER'
  return (
    <div>
        <Form {...form}>
      <form  className="space-y-6">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl >
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={role === 'MEMBER'}
                  onClick={async()=>{
                    try{
                        console.log(field.name, !field.value)
                      const res = await UpdateTeamPermission({token, team_id, permissionType: field.name, value: !field.value})
                      toast(res)
                    }catch(e : unknown){
                      if(e instanceof Error){
                        toast({title : e.message})
                      }
                    }
                    
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-lg">
                    Allow members to manage tasks
                </FormLabel>
               
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={role === 'MEMBER'}
                  onClick={async()=>{
                    try{
                        console.log(field.name, !field.value)
                      const res = await UpdateTeamPermission({token, team_id, permissionType: field.name, value: !field.value})
                      toast(res)
                    }catch(e : unknown){
                      if(e instanceof Error){
                        toast({title : e.message})
                      }
                    }
                    
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-lg">
                Allow members to manage files
                </FormLabel>
               
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="invite"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={role === 'MEMBER'}
                  onClick={async()=>{
                    try{
                        console.log(field.name, !field.value)
                      const res = await UpdateTeamPermission({token, team_id, permissionType: field.name, value: !field.value})
                      toast(res)
                    }catch(e : unknown){
                      if(e instanceof Error){
                        toast({title : e.message})
                      }
                    }
                    
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-lg">
                 Allow members to invite others
                </FormLabel>
               
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
    </div>
  )
}

export default SettingPermission