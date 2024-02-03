import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function EmptyFavorites() {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-favorites.svg"
                alt="Empty"
                height={180}
                width={180}
            />
            <h2 className="text-2xl font-semibold mt-6">
                No favorites yet
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Add a board to your favorites
            </p>
        </div>
    )
}