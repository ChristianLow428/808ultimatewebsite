// app/utils/startgg.ts

const STARTGG_API_URL = "https://api.start.gg/gql/alpha";

const TOURNAMENT_QUERY = `
  query GetHawaiiTournaments($perPage: Int!) {
    tournaments(query: {
      perPage: $perPage,
      filter: {
        countryCode: "US",
        addrState: "HI",
        videogameIds: [1386]
      }
    }) {
      nodes {
        id
        name
        startAt
        city
        url
        numAttendees # Added to fetch the actual registration counts dynamically
        images {
          url
          type
        }
      }
    }
  }
`;

export async function fetchLocalTournaments(limit = 15) {
  try {
    const response = await fetch(STARTGG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.STARTGG_API_KEY}`,
      },
      next: { revalidate: 900 }, 
      body: JSON.stringify({
        query: TOURNAMENT_QUERY,
        variables: { perPage: limit },
      }),
    });

    const json = await response.json();
    return json.data?.tournaments?.nodes || [];
  } catch (error) {
    console.error("Error fetching from start.gg:", error);
    return [];
  }
}