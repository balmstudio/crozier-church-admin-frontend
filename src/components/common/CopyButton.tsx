import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  value: string;
  label: string;
}

const CopyButton = ({ value, label }: CopyButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon-xs"
    aria-label={label}
    onClick={() => navigator.clipboard.writeText(value)}
  >
    <Copy className="text-crozier-text-accent" />
  </Button>
);

export default CopyButton;
