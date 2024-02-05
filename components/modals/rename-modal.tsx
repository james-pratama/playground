'use client'

import { useRenameModal } from "@/store/use-rename-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogClose, DialogFooter, DialogTitle } from "../ui/dialog"
import { useEffect, useState } from "react"

export default function RenameModal() {

    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModal()

    const [title, setTitle] = useState(initialValues.title)

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title])

    const onSubmit = () => {

    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                    <DialogDescription>
                        Enter a new title for this board.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}