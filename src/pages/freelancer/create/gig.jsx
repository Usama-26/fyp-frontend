import { useAccounts } from "@/context/AccountContext";
import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CreateGig() {
  const { user } = useAccounts();
  const router = useRouter();

  return <WebLayout>{user && <p>CREATE_GIG</p>}</WebLayout>;
}
