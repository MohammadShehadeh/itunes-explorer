"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { If } from "@/components/if";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { RouterOutput } from "@/server/root";
import { useTRPC } from "@/trpc/react";
import { PodcastCard } from "./podcast-card";
import { EmptyPodcastList, NoPodcastResults } from "./podcast-empty-states";
import { PodcastListSkeleton } from "./podcast-skeletons";

interface PodcastListProps {
  fetchResult: Promise<RouterOutput["search"]["get"]>;
}

interface SearchResultsHeaderProps {
  query: string;
}
export const SearchResultsHeader = ({ query }: SearchResultsHeaderProps) => {
  return <h2 className="text-2xl font-bold">نتائج البحث عن "{query}"</h2>;
};

export const PodcastSearchList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const trpc = useTRPC();
  const { data: podcastsData, isLoading } = useQuery(
    trpc.search.get.queryOptions({ query }, { enabled: !!query }),
  );

  if (isLoading) {
    return (
      <If condition={!!query}>
        <SearchResultsHeader query={query} />
        <PodcastListSkeleton />
      </If>
    );
  }

  if (!podcastsData?.results.length) {
    return <NoPodcastResults />;
  }

  return (
    <>
      <SearchResultsHeader query={query} />
      <Carousel>
        <CarouselContent>
          {podcastsData.results.map((podcast) => (
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
