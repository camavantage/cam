"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";

type Props = {
  showBtn?: boolean;
  onValueChange: (data: { value?: string }) => void;
};

export function SearchBar({ showBtn = false, onValueChange }: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <form className="relative flex" onSubmit={handleSubmit(onValueChange)}>
      <FiSearch className=" absolute text-muted-foreground left-2  top-3" />
      <Input
        type="search"
        size={1}
        placeholder="Rechercher ..."
        className="flex-1 pl-8 pr-3  focus:border-solid bg-muted"
        {...register("value", {
          required: true,
        })}
      />
      {showBtn && (
        <Button
          type="submit"
          className={cn(" absolute right-0 rounded-l-none ")}
          variant="outline"
        >
          Rechercher
        </Button>
      )}
    </form>
  );
}
