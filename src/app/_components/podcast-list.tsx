"use client";

import { use } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppTransition } from "@/providers/transition-provider";
import type { RouterOutput } from "@/server/root";
import { PodcastCard } from "./podcast-card";
import { EmptyPodcastList, NoPodcastResults } from "./podcast-empty-states";
import { PodcastListSkeleton } from "./podcast-skeletons";

interface PodcastListProps {
  fetchResult: Promise<RouterOutput["search"]["get"]>;
  variant?: "default" | "search";
  title?: string;
}

interface SearchResultsHeaderProps {
  query: string;
}
export const SearchResultsHeader = ({ query }: SearchResultsHeaderProps) => {
  return <h2 className="text-2xl font-bold">نتائج البحث عن "{query}"</h2>;
};

export const PodcastSearchList = ({ fetchResult }: PodcastListProps) => {
  const data = use(fetchResult);
  const { isPending, optimisticQuery } = useAppTransition();

  if (isPending) {
    return (
      <>
        <SearchResultsHeader query={optimisticQuery} />
        <PodcastListSkeleton />
      </>
    );
  }

  if (data?.results.length === 0) {
    return <NoPodcastResults />;
  }

  return (
    <>
      <SearchResultsHeader query={optimisticQuery} />
      <Carousel>
        <CarouselContent>
          {data?.results.map((podcast) => (
            <CarouselItem key={podcast.collectionId}>
              <PodcastCard podcast={podcast} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export const PodcastList = ({ fetchResult }: PodcastListProps) => {
  const data = use(fetchResult);

  if (data?.results.length === 0) {
    return <EmptyPodcastList />;
  }

  return (
    <Carousel>
      <CarouselContent>
        {data?.results.map((podcast) => (
          <CarouselItem key={podcast.collectionId}>
            <PodcastCard podcast={podcast} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
