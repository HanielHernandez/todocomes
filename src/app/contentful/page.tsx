import PageProps from "@/types/contentful/page-props";
import contentfulClient from "@/lib/contentfulClient";
import { cleanContentfulEntry } from "@/utils/contentful";
import { ComponentTypes } from "@/types/contentful/content-types";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pages = await contentfulClient.getEntries({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
    include: 10,
  });

  if (!pages.items.length) {
    redirect("/not-found");
  }

  const page = cleanContentfulEntry<PageProps>(pages.items[0]) as PageProps;

  return (
    <div>
      {page.blocks &&
        page.blocks.map((block) => {
          const BlockComponent = ComponentTypes[block.CONTENT_TYPE];
          return BlockComponent ? (
            <BlockComponent key={block.CONTENT_TYPE} {...block} />
          ) : (
            ""
          );
        })}
    </div>
  );
}
