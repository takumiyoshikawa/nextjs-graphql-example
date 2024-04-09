import { cache } from "react";
import { shopifyFetchSdk } from "..";

const getProduct = async (handle: string) => {
  const res = await shopifyFetchSdk.getProduct(
    { handle },
    { revalidate: 86400, tags: ["product"] }
  );

  return res;
};

export const cachedGetProduct = cache(getProduct);
