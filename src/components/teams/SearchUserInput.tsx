"use client"
import {
    Calculator,
    Calendar,
    CreditCard,
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
import { useState } from "react"
import { Button } from "../ui/button"
  
  export function SearchUserInput() {
    const [search , setSearch] = useState<string>("")
    const users = [
      "U000001",
      "U000002",
      "U000003",
      "U000004",
      "U000005",
      "U000006",
      "U000007",
      "U000008",
      "U000009",
      "U000010",
    ]
    return (
      <div className="flex gap-4 ">
      <Command className="rounded-lg border shadow-md max-h-[200px]">
        <CommandInput placeholder="Type a user name..." 
        value={search}
        onValueChange={setSearch}
        />
        {search !== "" &&
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <p>{search}</p>
          {users.map((user) => (
            <CommandItem key={user}  onSelect={() => setSearch(user)}>
              <User size={24} />
             <span>
               {user}
              </span>
            </CommandItem>
          ))}
        </CommandList>
  }
      </Command>
      <Button className="self-start" onClick={()=>console.log(search)}>Add</Button>
          </div>
    )
  }
  