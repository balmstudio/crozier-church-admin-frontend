import type { FormEventHandler, ReactElement, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import SideSheet from "@/components/common/SideSheet";
import { cn } from "@/lib/utils";

interface SideFormSheetProps {
  title: string;
  trigger?: ReactElement;
  submitLabel: string;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  cancelLabel?: string;
  onCancel?: () => void;
  contentClassName?: string;
}

const SideFormSheet = ({
  title,
  trigger,
  submitLabel,
  children,
  onSubmit,
  open,
  onOpenChange,
  cancelLabel = "Cancel",
  onCancel,
  contentClassName,
}: SideFormSheetProps) => {
  return (
    <SideSheet title={title} trigger={trigger} open={open} onOpenChange={onOpenChange}>
      <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
        <div className={cn("min-h-0 flex-1 space-y-7 overflow-y-auto px-7 py-4", contentClassName)}>{children}</div>

        <SheetFooter
          className="flex-row items-center justify-between border-t
              border-crozier-border-primary px-7 pt-4 pb-5"
        >
          {onCancel ? (
            <Button type="button" variant="outline" className="h-9 rounded-lg border-crozier-text-accent px-5 text-crozier-text-action hover:bg-crozier-surface-primary-tint" onClick={onCancel}>{cancelLabel}</Button>
          ) : (
            <SheetClose render={<Button variant="outline" className="h-9 rounded-lg border-crozier-text-accent px-5 text-crozier-text-action hover:bg-crozier-surface-primary-tint" />}>
              {cancelLabel}
            </SheetClose>
          )}
          <Button
            type="submit"
            className="h-9 rounded-lg bg-crozier-text-action px-5 text-neutral-white
                hover:bg-crozier-text-action"
          >
            {submitLabel}
          </Button>
        </SheetFooter>
      </form>
    </SideSheet>
  );
};

export default SideFormSheet;
