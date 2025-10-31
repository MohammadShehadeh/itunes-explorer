"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { useAppTransition } from "@/providers/transition-provider";

const formSchema = z.object({
  query: z.string().trim().min(2).max(50),
});

export const SearchBarForm = () => {
  const { startAppTransition, isPending, addOptimisticQuery, optimisticQuery } = useAppTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: optimisticQuery ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    /**
     * If the form is submitting or search query is the same as the previous query, return.
     * Otherwise, start a transition and push the new query to the URL.
     */
    if (isPending || optimisticQuery === data.query) return;

    startAppTransition(() => {
      addOptimisticQuery(data.query);
      router.push(`?query=${data.query}`);
    });
  }

  function onReset() {
    if (isPending || !form.getValues("query")) return;

    form.reset({ query: "" });

    startAppTransition(() => {
      addOptimisticQuery("");
      router.push(`/`);
    });
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
                disabled={isPending}
                placeholder="ابحث عن بودكاست..."
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon
                aria-invalid={fieldState.invalid}
                className="cursor-pointer"
                disabled={isPending}
                type="submit"
              >
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
