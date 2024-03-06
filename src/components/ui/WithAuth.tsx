import { SignupRequest } from "@/type/user";
import destr from "destr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

function WithAuth<T>(Component: React.ComponentType<T>) {
    const WithAuthComponent = (props: T) => {
        const token = cookies().get("accessToken")?.value;
        if (!token) {
            return redirect("/signin");
        }
        return( <>
        <Component {...props!} />
        </>
        )
    };

    WithAuthComponent.displayName = `WithAuth(${Component.displayName || Component.name})`;

    return WithAuthComponent;
}

export default WithAuth;