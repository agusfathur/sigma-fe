import { Separator } from "@/components/ui/separator";

interface ContentSectionProps {
  title: string;
  desc: string;
  children: JSX.Element;
}

export default function ContentSection({
  title,
  desc,
  children,
}: ContentSectionProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-none">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Separator className="my-2 flex-none" />
      <div className="-mx-4 flex-1 overflow-auto scroll-smooth px-4 md:pb-10">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
