import { ChevronUp } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { CROZIERICONS, Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getInitials } from "../../../utils/getInitials";
import type { SidebarProps } from "./Sidebar.types";

const Sidebar = ({
  brand,
  items,
  user,
  workspace,
  className = "",
  onLogout,
  onWorkspaceClick,
}: SidebarProps) => {
  return (
    <aside
      className={`sticky top-0 flex h-dvh w-65.5 min-w-65.5
        flex-col overflow-y-auto bg-crozier-surface-primary px-4 pt-4 pb-[35px] text-crozier-text-body-light
        max-[760px]:w-[min(262px,88vw)] max-[760px]:min-w-[min(262px,88vw)] ${className}`}
      aria-label="Primary navigation"
    >
      <div className="flex min-h-7 items-center gap-3">
        {brand.logo ? (
          <img
            className="h-7 w-8 shrink-0 object-contain"
            src={brand.logo}
            alt={brand.logoAlt ?? `${brand.name} logo`}
          />
        ) : (
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full
              bg-crozier-surface-primary text-[10px] font-bold text-neutral-white"
            aria-hidden="true"
          >
            {getInitials(brand.name)}
          </span>
        )}
        <span className="text-[17px] font-bold tracking-[-0.01em]">{brand.name}</span>
      </div>

      <nav className="mt-7.5 flex flex-col gap-5">
        {items.map(({ label, path, icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({
              isActive,
            }) => `group flex min-h-11 items-center gap-2.5 rounded-[9px] px-2.5
              text-[15px] font-medium no-underline transition-colors
              ${
                isActive
                  ? "bg-crozier-surface-primary-shade text-crozier-icon-primary [--navigation-icon-accent:var(--crozier-icon-accent)]"
                  : "text-crozier-icon-disabled-dark [--navigation-icon-accent:currentColor] hover:bg-crozier-surface-disabled-lighter hover:text-crozier-icon-primary"
              }`}
          >
            <span className="grid size-5 shrink-0 place-items-center">
              <Icon type={icon} size={20} />
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-crozier-border-primary-shade-2 pt-6.5">
        <div className="grid grid-cols-[36px_minmax(0,1fr)_34px] items-center gap-x-3 px-2">
          <Link to="/profile" className="contents" aria-label="Open profile">
            {user.avatar ? (
              <img className="size-9 shrink-0 rounded-full object-cover" src={user.avatar} alt="" />
            ) : (
              <span
                className="grid size-9 shrink-0 place-items-center rounded-full
                bg-crozier-border-primary text-[15px] font-bold text-crozier-text-body-light"
                aria-hidden="true"
              >
                {getInitials(user.name)}
              </span>
            )}
          </Link>
          <div className="flex min-w-0 flex-col gap-0.5">
            <strong className="overflow-hidden text-[13px] font-medium text-ellipsis whitespace-nowrap text-crozier-text-body">
              {user.name}
            </strong>
            <span className="text-xs text-crozier-text-placeholder">{user.role}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="grid size-8.5 cursor-pointer place-items-center rounded-full border-0 bg-transparent
              text-crozier-text-placeholder hover:bg-crozier-surface-disabled-lighter hover:text-crozier-text-body-light"
            aria-label="Log out"
            onClick={onLogout}
          >
            <Icon type={CROZIERICONS.Logout} width={14.7} height={16} />
          </Button>
        </div>

        {workspace && <Button
          variant="ghost"
          size="lg"
          className="mt-7.5 grid min-h-17 w-full grid-cols-[36px_minmax(0,1fr)_34px] items-center gap-x-3 rounded-xl
            border-0 bg-crozier-surface-primary-tint px-2 py-3 text-left text-crozier-text-info hover:bg-crozier-surface-primary-tint
            hover:text-crozier-text-heading"
          onClick={onWorkspaceClick}
        >
          <span className="grid size-9 place-items-center text-crozier-text-heading">
            {workspace.icon}
          </span>
          <span className="flex min-w-0 flex-col gap-0.5 text-[13px] leading-tight">
            <strong className="font-medium">{workspace.name}</strong>
            {workspace.description && <span>{workspace.description}</span>}
          </span>
          <ChevronUp className="justify-self-center text-crozier-text-heading" size={18} />
        </Button>}
      </div>
    </aside>
  );
};

export default Sidebar;
