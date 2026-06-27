// app/page.tsx
import { fetchLocalTournaments } from "./utils/startgg";
import HomeClient from "./HomeClient";

// Force Next.js to revalidate this page's data at most every 15 minutes
export const revalidate = 900; 

export default async function Page() {
  // Fetch the data securely on the server side using process.env.STARTGG_API_KEY
  const initialTournaments = await fetchLocalTournaments(15);

  return <HomeClient initialTournaments={initialTournaments} />;
}