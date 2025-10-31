import { Card, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export const PodcastCardSkeleton = () => {
  return (
    <Card className="overflow-hidden pt-0">
      <Skeleton className="aspect-video w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-1/4" />
      </CardHeader>
    </Card>
  );
};

export const PodcastListSkeleton = () => {
  const SKELETON_ITEMS_COUNT = 8;

  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
          <CarouselItem key={index.toString()}>
            <PodcastCardSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
