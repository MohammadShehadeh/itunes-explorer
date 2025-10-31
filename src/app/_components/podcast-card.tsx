"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ITunesPodcastResult } from "@/types/itunes";

interface PodcastCardProps {
  podcast: ITunesPodcastResult;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const imageSrc = podcast.artworkUrl600 ?? podcast.artworkUrl100 ?? podcast.artworkUrl60 ?? "";
  const title = podcast.collectionName ?? podcast.trackName ?? "";
  const artist = podcast.artistName ?? "";
  const genre = podcast.primaryGenreName ?? "";
  const href = podcast.collectionViewUrl ?? podcast.trackViewUrl ?? "#";

  return (
    <Card className="overflow-hidden pt-0 relative">
      <a href={href} target="_blank" rel="noreferrer" className="block relative aspect-video w-full">
        <Image
          sizes="(max-width: 768px) 100vw, 300px"
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </a>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-base">{title}</CardTitle>
        <Badge className="absolute top-2 start-2" variant="secondary">
          {genre}
        </Badge>
        <CardContent className="p-0">
          <CardDescription className="line-clamp-1 text-sm">{artist}</CardDescription>
          <CardDescription className="text-xs text-muted-foreground">
            الحلقات: {podcast.trackCount}
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
