import { BusinessAuth } from "@/components/shared";

export default async function Home() {
  return (
    <main className="p-8">
      <h1>StampSavvy</h1>

      <BusinessAuth />
    </main>
  );
}
