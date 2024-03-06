"use client"
import {
    Calculator,
    Calendar,
    Check,
    CreditCard,
    Loader,
    Loader2,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useRef, useState } from "react"
import { Button } from "../ui/button"
import type { ChangeEvent } from 'react'
import { inviteMember } from "@/api-caller/team"
import { useQueryClient } from "@tanstack/react-query"
import { isResponseError } from "@/lib/utils"
import { toast, useToast } from '@/components/ui/use-toast';

  type users = {
    user_id:string
    username:string
    avater:string
    email:string
  }
  type SearchUserInputProps = {
    token :string;
    searchfn : (value: string) => Promise<users[]>;
    team_id : string;
  }
  export function SearchUserInput({token,searchfn,team_id} : SearchUserInputProps) {
    const queryClient = useQueryClient()
    const [search , setSearch] = useState<string>("")
    const [users, setUsers] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
    const [userss, setUser] = useState<users[]>([])

    const {toast  } = useToast()

    const searching = async (value: string) => {
      if (value !== "") {
        try {
          
          const data = await searchfn(value);
          console.log(data)
          setUser([...data]);
          console.log(data, userss);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        }
        else{
          setUser([])
        
        }
    }

    // Debounce function
    function debounce<T extends (...args: any[]) => void>(
      func: T,
      delay: number
    ): (...args: Parameters<T>) => void {
      let debounceTimeout: NodeJS.Timeout | null = null;
    
      return function (...args: Parameters<T>) {
        if (debounceTimeout){ 
          clearTimeout(debounceTimeout)
        };
        debounceTimeout = setTimeout(() => {
          console.log('one')
          func(...args);
          setLoading(false)
          debounceTimeout = null;
        }, delay);
        setLoading(true)
      };
    }

  const debouncedSearch = debounce(searching, 1500)
  const handleChange = async (value: string) => {
    setSearch(value);
    debouncedSearch(value)
    }


    return (
      <div className="flex gap-4">
      <Command shouldFilter={false} filter={() => 1} className="rounded-lg border shadow-md max-h-[200px] lg:max-w-[420px] sm:max-w-[200px]">
        <CommandInput
        placeholder="Type a user name..."
        value={search}
        onValueChange={handleChange}
        />
        {search !== "" && (!loading ? (
        <CommandList>
          {userss?.map((user) => (
          <CommandItem key={user.user_id} onSelect={() => {
            if(users.find((val) => val === user.user_id)){
              setUsers(users.filter((val) => val !== user.user_id))
            }
            else{
              setUsers([...users, user.user_id])
            }
          }}>
            {users.find((val) => val === user.user_id) ? <Check size={16} /> : <Check size={16} className="invisible" />}
            <User size={24} />
            <span>{user.username}</span>
          </CommandItem>
          ))}
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
        ) : (
          <div className="flex items-center justify-center  h-[150px]">
          <Loader2 size={40} className="animate-spin" />
        </div>
        ))}
      </Command>
      {/* <Button className="self-start" onClick={() => searching(search)}>
        Search
      </Button> */}
      <Button className="self-start" onClick={async() => {
        try{
          const res = await inviteMember({team_id,token,users})
          setUser(userss.filter((val)=>  users.includes(val.user_id) === false))
          setUsers([])
          toast({title:res, variant:"success"})
        }catch(e){
          isResponseError(e) && toast({title : e.message})
        }
        
        queryClient.invalidateQueries({queryKey: [`member-${team_id}`]})
      }
        }>
        Add 
      </Button>
      </div>
    );
  }
  