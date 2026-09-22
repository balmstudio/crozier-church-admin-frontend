import { Bell, ChevronsRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import appGridIcon from "@/assets/icons/navigation/app-grid.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavbarProps } from "./Navbar.types";

const Navbar = ({
  breadcrumbs,
  brand,
  hasUnreadNotifications = false,
  className,
  onNotificationsClick,
}: NavbarProps) => {
  return (
    <header
      className={cn(
        "flex h-18.5 shrink-0 items-center justify-between",
        "bg-crozier-surface-primary px-7",
        className,
      )}
    >
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-4">
          {breadcrumbs.map((breadcrumb, index) => {
            const isCurrent = index === breadcrumbs.length - 1;

            return (
              <li key={`${breadcrumb.label}-${index}`} className="flex items-center gap-4 text-sm">
                {index > 0 && (
                  <ChevronsRight
                    aria-hidden="true"
                    className="text-crozier-border-primary-dark"
                    size={20}
                    strokeWidth={1.8}
                  />
                )}

                {breadcrumb.path && !isCurrent ? (
                  <NavLink
                    className="text-sm font-medium text-crozier-text-body
                      no-underline hover:text-crozier-text-heading"
                    to={breadcrumb.path}
                  >
                    {breadcrumb.label}
                  </NavLink>
                ) : (
                  <span
                    className="text-sm font-medium text-crozier-text-body-light"
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {breadcrumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="flex items-center gap-5">
      <Button
        variant="ghost"
        size="icon"
        className="relative size-10 rounded-full text-crozier-text-body-light
          hover:bg-crozier-surface-disabled-lighter hover:text-crozier-text-heading"
        aria-label="View notifications"
        onClick={onNotificationsClick}
      >
        <Bell className="size-6 fill-current" strokeWidth={1.8} />
        {hasUnreadNotifications && (
          <span
            className="absolute top-1.5 right-1.5 size-2.5 rounded-full
              border-2 border-neutral-white bg-crozier-text-accent"
            aria-hidden="true"
          />
        )}
      </Button>
      <img src={appGridIcon} alt="" aria-hidden="true" className="size-4" />
      {brand && <div className="ml-3 flex items-center gap-3">
        <img src={brand.logo} alt="" className="size-6 rounded-full object-cover" />
        <span className="text-[22px] font-bold tracking-[-0.01em] text-crozier-text-heading">{brand.name}</span>
      </div>}
      </div>
    </header>
  );
};

export default Navbar;
