import type { ReactNode } from "react";

interface ChartPanelProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}

const ChartPanel = ({ title, action, children }: ChartPanelProps) => {
  return (
    <section>
      <div className="mb-4 flex min-h-8 items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-crozier-text-body-shade">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
};

export default ChartPanel;
