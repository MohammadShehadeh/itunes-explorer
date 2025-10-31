import { Suspense } from "react";
import { z } from "zod";
import { If } from "@/components/if";
import { Navbar } from "@/components/navbar";
import { TransitionProvider } from "@/providers/transition-provider";
import { api } from "@/trpc/server";
import { PodcastList, PodcastSearchList } from "./_components/podcast-list";
import { PodcastListSkeleton } from "./_components/podcast-skeletons";
import { SearchBarForm } from "./_components/search-bar";

const searchParamsSchema = z.object({
  query: z.string().min(2).optional(),
});

export default async function HomePage(props: PageProps<"/">) {
  const searchParams = await props.searchParams;
  const { success, data } = searchParamsSchema.safeParse(searchParams);
  const safeQuery = success ? (data?.query ?? "") : "";

  const podcastsInitialData = await api.search.get({ query: safeQuery });
  const fanjanPromise = api.search.get({ query: "فنجان" });
  const newsPromise = api.search.get({ query: "الأخبار" });
  const comedyPromise = api.search.get({ query: "كوميديا" });

  return (
    <TransitionProvider>
      <Navbar>
        <SearchBarForm />
      </Navbar>

      <section className="space-y-18 container">
        <section className="space-y-4 empty:hidden">
          <PodcastSearchList initialData={podcastsInitialData} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">أفضل البودكاست لـ فنجان</h2>
          <Suspense fallback={<PodcastListSkeleton />}>
            <PodcastList fetchResult={fanjanPromise} />
          </Suspense>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">بودكاست أخبار</h2>
          <Suspense fallback={<PodcastListSkeleton />}>
            <PodcastList fetchResult={newsPromise} />
          </Suspense>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">كوميديا وترفيه</h2>
          <Suspense fallback={<PodcastListSkeleton />}>
            <PodcastList fetchResult={comedyPromise} />
          </Suspense>
        </section>
      </section>
    </TransitionProvider>
  );
}
