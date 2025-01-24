import { Tabbar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies",
  description: "Cookies page",
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold text-gray-600">Tabs</span>
        <Tabbar currentTab={+cookieTab} />
      </div>
    </div>
  );
}
