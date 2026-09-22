import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface TableRowAction {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
}

interface TableRowActionsProps {
  actions: TableRowAction[];
  label: string;
  contentClassName?: string;
  itemClassName?: string;
}

const TableRowActions = ({
  actions,
  label,
  contentClassName,
  itemClassName,
}: TableRowActionsProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-crozier-text-body-light"
          aria-label={label}
        />
      }
    >
      <MoreVertical className="size-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      sideOffset={4}
      className={cn(
        "min-w-25.5 rounded-lg border border-crozier-border-primary bg-crozier-surface-white-black",
        "p-1.5 shadow-lg",
        contentClassName,
      )}
    >
      {actions.map((action) => (
        <DropdownMenuItem
          key={action.label}
          disabled={action.disabled}
          className={cn(
            "h-8 cursor-pointer rounded-md px-2 text-sm text-crozier-text-body",
            "focus:bg-crozier-surface-disabled-lighter",
            itemClassName,
          )}
          onClick={action.onSelect}
        >
          {action.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default TableRowActions;
