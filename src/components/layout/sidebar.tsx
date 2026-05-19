"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { primaryNavigation, type NavItem } from "@/features/navigation/navigation.config";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type SidebarProps = {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
};

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  return (
    <>
      <aside className="hidden min-h-screen border-r border-border/70 bg-sidebar/95 px-3 py-4 text-sidebar-foreground lg:block">
        <SidebarContent />
      </aside>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden",
          isMobileOpen ? "block" : "hidden",
        )}
        onClick={onMobileClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(320px,86vw)] border-r border-border/80 bg-sidebar px-3 py-4 text-sidebar-foreground shadow-2xl transition-transform lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <BrandMark />
          <Button
            aria-label="Close navigation"
            onClick={onMobileClose}
            size="icon"
            variant="ghost"
          >
            <X />
          </Button>
        </div>
        <SidebarContent compactBrand />
      </aside>
    </>
  );
}

function SidebarContent({ compactBrand = false }: { compactBrand?: boolean }) {
  return (
    <div className="flex h-full flex-col gap-5">
      {!compactBrand ? <BrandMark /> : null}
      <div className="px-2">
        <Badge className="border-cyan-300/25 bg-cyan-300/10 text-cyan-100" variant="outline">
          Brain OS
        </Badge>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {primaryNavigation.map((item) => (
          <NavCluster item={item} key={item.href} />
        ))}
      </nav>
      <Separator />
      <div className="px-2 text-xs leading-5 text-muted-foreground">
        Frontend foundation. Data, agents, and memory systems are intentionally
        contract-first.
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <Link className="flex items-center gap-3 rounded-md px-2 py-1.5" href="/dashboard">
      <div className="grid size-9 place-items-center rounded-md border border-cyan-200/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
        JB
      </div>
      <div>
        <div className="text-sm font-semibold tracking-normal text-foreground">
          Jared Brain
        </div>
        <div className="text-xs text-muted-foreground">Personal command center</div>
      </div>
    </Link>
  );
}

function NavCluster({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

  return (
    <div>
      <NavLink item={item} isActive={isActive} />
      {item.items?.length ? (
        <div className="ml-4 mt-1 border-l border-border/60 pl-2">
          {item.items.map((child) => {
            const childActive = pathname === child.href;

            return (
              <NavLink
                compact
                isActive={childActive}
                item={child}
                key={child.href}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function NavLink({
  compact = false,
  isActive,
  item,
}: {
  compact?: boolean;
  isActive: boolean;
  item: NavItem;
}) {
  const Icon = item.icon;

  return (
    <Link
      className={cn(
        "group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        compact && "py-1.5 text-xs",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
      )}
      href={item.href}
    >
      <Icon className={cn("size-4", compact && "size-3.5")} />
      <span className="min-w-0 flex-1 truncate">{item.title}</span>
    </Link>
  );
}
