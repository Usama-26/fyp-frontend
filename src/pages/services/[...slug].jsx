import { Breadcrumbs } from "@/components/Breadcrumbs";
import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";

export default function ServicePage() {
  const router = useRouter();
  console.log(router.query.slug);
  return (
    <WebLayout>
      <Breadcrumbs />
    </WebLayout>
  );
}
