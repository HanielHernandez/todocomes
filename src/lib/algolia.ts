import { algoliasearch } from "algoliasearch";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || "";

export const algoliaClient = algoliasearch(ALGOLIA_APP_ID,ALGOLIA_API_KEY);