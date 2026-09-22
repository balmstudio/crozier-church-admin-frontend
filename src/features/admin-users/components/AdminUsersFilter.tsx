import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AdminUsersFilterValue {
  startDate: string;
  endDate: string;
}

interface AdminUsersFilterProps {
  value: AdminUsersFilterValue;
  onApply: (value: AdminUsersFilterValue) => void;
}

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const toISO = (date: Date) => date.toISOString().slice(0, 10);

const AdminUsersFilter = ({ value, onApply }: AdminUsersFilterProps) => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(new Date(Date.UTC(2026, 0, 1)));
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [draft, setDraft] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const monthYear = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(month);
  const firstWeekday = (month.getUTCDay() + 6) % 7;
  const firstDay = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1 - firstWeekday));
  const days = Array.from({ length: 42 }, (_, index) => new Date(Date.UTC(firstDay.getUTCFullYear(), firstDay.getUTCMonth(), firstDay.getUTCDate() + index)));

  const chooseDate = (date: Date) => {
    const iso = toISO(date);
    if (selecting === "start") {
      setDraft({ startDate: iso, endDate: "" });
      setSelecting("end");
      return;
    }
    const next = iso < draft.startDate
      ? { startDate: iso, endDate: draft.startDate }
      : { startDate: draft.startDate || iso, endDate: iso };
    setDraft(next);
    onApply(next);
    setOpen(false);
  };

  return <div ref={containerRef} className="relative">
    <Button variant="outline" aria-haspopup="dialog" aria-expanded={open} className="h-8 gap-2 rounded-lg px-3 text-sm font-normal text-crozier-text-body-light" onClick={() => { setDraft(value); setSelecting("start"); setOpen((current) => !current); }}>
      <Filter size={14} fill="currentColor" />Date
    </Button>
    {open && <div role="dialog" aria-label="Select last active date range" className="absolute top-10 right-0 z-30 h-[404px] w-[392px] rounded-[11px] border border-crozier-border-primary bg-white px-7 pt-4 shadow-[0_12px_32px_rgba(20,40,70,0.12)]">
      <div className="grid h-[34px] grid-cols-2 overflow-hidden rounded-[10px] border border-crozier-border-primary text-sm text-crozier-text-body-light">
        <button type="button" className={`border-r border-crozier-border-primary ${selecting === "start" ? "rounded-l-[9px] border border-crozier-text-accent text-crozier-text-body" : ""}`} onClick={() => setSelecting("start")}>Start date</button>
        <button type="button" className={selecting === "end" ? "rounded-r-[9px] border border-crozier-text-accent text-crozier-text-body" : ""} onClick={() => setSelecting("end")}>End date</button>
      </div>
      <div className="mt-2 flex h-9 items-center justify-between text-sm">
        <button type="button" aria-label="Previous month" className="grid size-7 place-items-center" onClick={() => setMonth(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() - 1, 1)))}><ChevronLeft size={16} /></button>
        <span className="text-crozier-text-action">{monthYear}</span>
        <button type="button" aria-label="Next month" className="grid size-7 place-items-center" onClick={() => setMonth(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 1)))}><ChevronRight size={16} /></button>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-sm text-crozier-text-action">
        {weekdays.map((day) => <span key={day} className="flex h-9 items-center justify-center">{day}</span>)}
      </div>
      <div className="grid grid-cols-7 text-center text-sm text-crozier-text-body-light">
        {days.map((day) => {
          const iso = toISO(day);
          const inMonth = day.getUTCMonth() === month.getUTCMonth();
          const selected = iso === draft.startDate || iso === draft.endDate;
          const inRange = Boolean(draft.startDate && draft.endDate && iso > draft.startDate && iso < draft.endDate);
          return <button key={iso} type="button" aria-label={new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(day)} aria-pressed={selected}
            className={`flex h-11 items-center justify-center rounded-lg hover:bg-crozier-surface-primary-tint ${inMonth ? "" : "text-crozier-text-placeholder"} ${inRange ? "bg-crozier-surface-primary-tint" : ""} ${selected ? "bg-crozier-text-action text-white hover:bg-crozier-text-action" : ""}`}
            onClick={() => chooseDate(day)}>{day.getUTCDate()}</button>;
        })}
      </div>
    </div>}
  </div>;
};

export default AdminUsersFilter;
