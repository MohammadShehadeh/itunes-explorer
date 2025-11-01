import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { api } from "@/trpc/server";
import { PodcastList, PodcastSearchList } from "./_components/podcast-list";
import { PodcastListSkeleton } from "./_components/podcast-skeletons";
import { SearchBarForm } from "./_components/search-bar";

export default async function HomePage() {
  const fanjanPromise = api.search.get({ query: "فنجان" });
  const newsPromise = api.search.get({ query: "الأخبار" });
  const comedyPromise = api.search.get({ query: "كوميديا" });

  return (
    <>
      <Navbar>
        <SearchBarForm />
      </Navbar>

      <section className="space-y-18 container">
        <section className="space-y-4 empty:hidden">
          <Suspense>
            <PodcastSearchList />
          </Suspense>
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
    </>
  );
}
