import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";

interface TagFilterItemProps {
  tag: string;
  onSelect: (tag: string) => void;
}

export function TagFilterItem({ tag, onSelect }: TagFilterItemProps) {
  return (
    <DropdownMenuItem onClick={() => onSelect(tag)}>{tag}</DropdownMenuItem>
  );
}
