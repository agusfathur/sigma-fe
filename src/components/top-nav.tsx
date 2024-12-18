import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./custom/button";
import { IconMenu } from "@tabler/icons-react";

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string;
    href: string;
    isActive: boolean;
  }[];
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  return (
    <>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {links.map(({ title, href, isActive }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link
                  href={href}
                  className={!isActive ? "text-muted-foreground" : ""}
                >
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          "hidden items-center space-x-4 md:flex lg:space-x-6",
          className,
        )}
        {...props}
      >
        {links.map(({ title, href, isActive }) => (
          <Link
            key={`${title}-${href}`}
            href={href}
            className={`rounded-md bg-slate-300 px-3 py-1 text-sm font-medium text-black transition-colors hover:scale-95 hover:text-primary dark:text-gray-950 ${isActive ? "" : "text-muted-foreground"}`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
}
