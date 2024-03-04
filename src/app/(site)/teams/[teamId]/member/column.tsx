"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, Cross,X, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

import { useFileStore } from "@/store/FileStore";
import Link from "next/link";
import { User } from "@/type/user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
type MemberUser = {
    member_id: string
    username: string
    email: string
    role : 'OWNER' | 'MEMBER'
}




export const columns: ColumnDef<MemberUser>[] = [
    {
        accessorKey: "username",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    
]