"use client";

import { Headset } from "lucide-react";
import { If } from "@/components/if";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { useAppTransition } from "@/providers/transition-provider";

export const EmptyPodcastList = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Headset />
        </EmptyMedia>
        <EmptyTitle>لا توجد بودكاست متاحة حالياً</EmptyTitle>
        <EmptyDescription>
          لم يتم العثور على أي بودكاست في هذا القسم. يرجى المحاولة مرة أخرى لاحقاً.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export const NoPodcastResults = () => {
  const { optimisticQuery } = useAppTransition();

  return (
    <If condition={!!optimisticQuery}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Headset />
          </EmptyMedia>
          <EmptyTitle>لا توجد نتائج مطابقة لـ "{optimisticQuery}"</EmptyTitle>
          <EmptyDescription>
            لم نجد أي بودكاست يطابق بحثك. حاول استخدام كلمات مختلفة أو تحقق من الإملاء.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </If>
  );
};
