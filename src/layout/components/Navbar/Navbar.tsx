import { Bell, ChevronsRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { CROZIERICONS, Icon } from "@/components/icons";
import membersLogo from "@/assets/icons/units/members-logo.png";
import branchAdminLogo from "@/assets/icons/units/branch-admin-logo.png";
import churchAdminLogo from "@/assets/dashboard/church-admin.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavbarProps } from "./Navbar.types";

const AppLogo = ({ app }: { app: "members" | "branch" | "church" }) => {
  if (app === "church") {
    return <img src={churchAdminLogo} alt="" className="h-8 w-9 object-contain" />;
  }

  const isMembers = app === "members";
  return (
    <span className="relative block h-8 w-10" aria-hidden="true">
      <span
        className={cn(
          "absolute top-0 left-0 h-8 w-9 rounded-tl-[9px] rounded-tr-[9px] border-t-4 border-l-4",
          isMembers ? "border-[#008744]" : "border-[#2F7DD4]",
        )}
      />
      <img
        src={isMembers ? membersLogo : branchAdminLogo}
        alt=""
        className={cn(
          "absolute object-contain",
          isMembers ? "top-1.75 left-2.25 h-6.75 w-7.75" : "top-1.75 left-3 size-6.75",
        )}
      />
    </span>
  );
};

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
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full text-crozier-text-body hover:bg-crozier-surface-disabled-lighter"
                aria-label="Open applications"
              />
            }
          >
            <Icon type={CROZIERICONS.AppGrid} size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            alignOffset={-163}
            sideOffset={29}
            className="grid h-32 w-100.5 grid-cols-[repeat(3,128px)] content-center
            relative -top-px left-10 justify-start gap-0 overflow-hidden rounded-2xl border-2 border-[#EAF0F7]
            bg-crozier-surface-primary p-0 pl-1.25 shadow-none ring-0"
            aria-label="Applications"
          >
            <DropdownMenuItem className="mx-auto flex h-28 w-28 cursor-pointer flex-col items-center
            justify-start gap-2 rounded-xl pt-5 text-center hover:bg-crozier-surface-disabled-lighter
            focus:bg-crozier-surface-disabled-lighter">
              <AppLogo app="members" />
              <span className="text-[13px] leading-4 text-crozier-text-heading">Members<br />Mgmt.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-auto flex h-28 w-28 cursor-pointer flex-col items-center
            justify-start gap-2 rounded-xl pt-5 text-center hover:bg-crozier-surface-disabled-lighter
            focus:bg-crozier-surface-disabled-lighter">
              <AppLogo app="branch" />
              <span className="text-[13px] leading-4 text-crozier-text-heading">Branch<br />Admin</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-auto flex h-28 w-28 cursor-pointer flex-col items-center
            justify-start gap-2 rounded-xl pt-5 text-center hover:bg-crozier-surface-disabled-lighter
            focus:bg-crozier-surface-disabled-lighter">
              <AppLogo app="church" />
              <span className="text-[13px] leading-4 text-crozier-text-heading">Church<br />Admin</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {brand && <div className="ml-3 flex items-center gap-3">
          <img src={brand.logo} alt="" className="size-6 rounded-full object-cover" />
          <span className="text-[22px] font-bold tracking-[-0.01em] text-crozier-text-heading">{brand.name}</span>
        </div>}
      </div>
    </header>
  );
};

export default Navbar;
