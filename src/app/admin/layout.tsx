import MlNavbar from "@/components/molecules/MlNavbar";

export default function Layout  ({children}: React.PropsWithChildren) {
    return <div className=" ">
        <MlNavbar/>
        <div className="container mx-auto p-4 min-h-screen flex flex-col items-start justify-start"> 
        {children}

        </div>
    </div>
}