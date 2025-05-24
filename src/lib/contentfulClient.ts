import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN as string,
});

export default contentfulClient;
