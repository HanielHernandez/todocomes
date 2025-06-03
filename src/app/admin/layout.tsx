'use client';
import MlNavbar from "@/components/molecules/MlNavbar";
import { usePathname } from "next/navigation";

const excludedPaths = [
  "/admin/signin",
  "/admin/signup",
  "/admin/forgot-password",
];

export default function Layout({ children }: React.PropsWithChildren) {
  const pathName = usePathname();

  const isExcluded = excludedPaths.some((excludedPath) =>
    pathName.startsWith(excludedPath)
  );

  return (
    <div className="test ">
      {!isExcluded && <MlNavbar />}
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-start justify-start">
        {children}
      </div>
    </div>
  );
}
