import SideSheet from "@/components/common/SideSheet";
import { Button } from "@/components/ui/button";

interface ConfirmationSideSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  heading: string;
  description: string;
  actionLabel: string;
  onConfirm?: () => void;
}

const ConfirmationSideSheet = ({
  open,
  onOpenChange,
  title,
  heading,
  description,
  actionLabel,
  onConfirm,
}: ConfirmationSideSheetProps) => (
  <SideSheet title={title} open={open} onOpenChange={onOpenChange}>
    <div className="flex min-h-0 flex-1 items-center justify-center px-10 pb-14">
      <div className="max-w-77.5 text-center">
        <h2 className="text-base font-medium text-crozier-text-body">{heading}</h2>
        <p className="mt-1 text-sm leading-5 text-crozier-text-placeholder">{description}</p>
        <Button
          type="button"
          className="mt-6 h-9 rounded-[10px] bg-crozier-text-error px-6 text-neutral-white
            hover:bg-crozier-text-error"
          onClick={onConfirm}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  </SideSheet>
);

export default ConfirmationSideSheet;
