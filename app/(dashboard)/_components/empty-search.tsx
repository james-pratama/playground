import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function EmptySearch() {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-search.svg"
                alt="Empty"
                height={180}
                width={180}
            />
            <h2 className="text-2xl font-semibold mt-6">
                No results found
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try search something else
            </p>
        </div>
    )
}