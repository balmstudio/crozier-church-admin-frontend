import { CircleX } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SideSheetProps {
  title: string;
  trigger?: ReactElement;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SideSheet = ({ title, trigger, children, open, onOpenChange }: SideSheetProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    {trigger && <SheetTrigger render={trigger} />}
    <SheetContent
      side="right"
      showCloseButton={false}
      className="w-full gap-0 overflow-hidden rounded-l-[18px] border-l-0
        bg-crozier-surface-white-black duration-300 ease-in-out sm:w-117 sm:max-w-117
        data-[side=right]:border-l-0 data-[side=right]:sm:max-w-117"
    >
      <SheetHeader className="relative border-b border-crozier-border-primary px-7 py-5.5">
        <SheetTitle className="text-[20px] leading-7 font-medium text-crozier-text-heading">{title}</SheetTitle>
        <SheetClose
          render={
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-5 size-8 rounded-full
                text-crozier-text-placeholder hover:bg-crozier-surface-disabled-lighter"
              aria-label={`Close ${title.toLowerCase()} panel`}
            />
          }
        >
          <CircleX className="size-4 fill-crozier-icon-disabled-light text-neutral-white" />
        </SheetClose>
      </SheetHeader>
      {children}
    </SheetContent>
  </Sheet>
);

export default SideSheet;
