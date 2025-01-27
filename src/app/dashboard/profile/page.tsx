"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProgilePage() {
  useEffect(() => {
    console.log("Profile Page");
  }, []);

  const { data: session } = useSession();

  return (
    <div>
      <div className="flex flex-col">
        <span>{session?.user?.name ?? "No name"}</span>
        <span>{session?.user?.image ?? "No image"}</span>
        <span>{session?.user?.email ?? "No email"}</span>
      </div>
    </div>
  );
}
