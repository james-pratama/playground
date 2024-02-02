import Image from "next/image";

export default function Loading() {
    return (
        <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={80}
                height={80}
                className="animate-pulse duration-700"
            />
        </div>
    )
}