import { api } from "@/trpc/server";

export default async function Home() {
  const result = await api.search.get({ query: "test" });
  return <h1>{result}</h1>;
}
