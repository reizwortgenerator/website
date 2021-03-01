import { GraphQLClient } from "graphql-request";

const graphcmsClient = new GraphQLClient(
  "https://api-eu-central-1.graphcms.com/v2/cklnrhb9xjwvp01xd83ylciz6/master"
);

export default (_, inject) => {
  inject("graphcms", graphcmsClient);
};
