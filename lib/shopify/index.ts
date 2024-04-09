import { print } from "graphql";
import { getSdk, Requester } from "./__generated__/graphql";

const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json` as string;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

interface RequestOptions {
  headers?: Record<string, string>;
  revalidate: false | number;
  tags?: string[];
}

const customShopifyRequester: Requester<RequestOptions> = async (
  doc,
  variables,
  options?
) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": process.env
      .SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
    ...options?.headers,
  };
  const revalidate = options?.revalidate ?? 0;
  const tags = options?.tags ?? [];
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: print(doc),
        variables,
      }),
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(
        `GraphQL Error: ${response.status} ${response.statusText}`
      );
    }
    const data = (await response.json()).data;
    return data;
  } catch (error) {
    console.error("Error in GraphQL request:", error);
  }
};

export const shopifyFetchSdk = getSdk(customShopifyRequester);
