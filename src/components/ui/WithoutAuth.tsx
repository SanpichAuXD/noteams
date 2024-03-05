import { SignupRequest } from "@/type/user";
import destr from "destr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

function WithoutAuth<T>(Component: React.ComponentType<T>) {
    const WithAuthComponent = (props: T) => {
        const token = cookies().get("accessToken")?.value;
        
        if (token) {
            return redirect("/");
        }
        return( <>
        <Component {...props!} />
        </>
        )
    };

    WithAuthComponent.displayName = `WithAuth(${Component.displayName || Component.name})`;

    return WithAuthComponent;
}

export default WithoutAuth;