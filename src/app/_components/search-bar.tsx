"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  query: z.string().trim().min(2).max(50),
});

export const SearchBarForm = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query,
    },
  });

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    return params.toString();
  };

  const pushQueryString = (name: string, value: string) => {
    window.history.pushState({}, "", `?${createQueryString(name, value)}`);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (query === data.query) return;

    pushQueryString("query", data.query);
  }

  function onReset() {
    if (!form.getValues("query")) return;

    form.reset({ query: "" });
    pushQueryString("query", "");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="query"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <InputGroup>
              <InputGroupInput
                placeholder="ابحث عن بودكاست..."
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon aria-invalid={fieldState.invalid} className="cursor-pointer" type="submit">
                <Search />
              </InputGroupAddon>
              <InputGroupAddon
                aria-invalid={fieldState.invalid}
                className={cn("cursor-pointer", {
                  "invisible pointer-events-none": !form.getValues("query"),
                })}
                align="inline-end"
                type="reset"
                onClick={onReset}
              >
                <X />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        )}
      />
    </form>
  );
};
