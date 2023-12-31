import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../go/graph/schema.graphqls",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generatedGqlTypes__/": {
      preset: "client",
    },
  },
};

export default config;
