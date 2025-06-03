'use client';

import { Plus } from "lucide-react";
import { CreateCategoryAction, MlCategoriesForm } from "./MlCategoriesForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { CreateCategoryDto } from "@/types/restaurant";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useRouter } from "next/navigation"

type MlNewCategoryDialogProps = {
  action: CreateCategoryAction;
};

export function MlNewCategoryDialog({
  action,
}: MlNewCategoryDialogProps) {
  const [open, setOpen] = useState(false);
    const router = useRouter()


  const createCategoryAction = async (values: CreateCategoryDto) => {
    try {
      await action(values);
      setOpen(false);
      router.refresh(); // Refresh the page to see the new category
    } catch (e) {
      console.error("Error creating category:", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Plus /> Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Category</DialogTitle>

        <MlCategoriesForm action={createCategoryAction} />
      </DialogContent>
    </Dialog>
  );
}
