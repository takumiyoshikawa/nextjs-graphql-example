import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const endpoint =
  `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json` as string;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [endpoint]: {
      headers: {
        "X-Shopify-Storefront-Access-Token": token,
      },
    },
  },
  documents: ["./lib/**/*.graphql"],
  ignoreNoDocuments: false,
  generates: {
    './lib/shopify/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk']
    }
  },
};

export default config;
