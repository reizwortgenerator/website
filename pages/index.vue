<template>
  <pre>{{ stories }}</pre>
</template>

<script>
import { gql } from "graphql-request";
export default {
  name: "Stories",

  async asyncData({ $graphcms }) {
    const { stories } = await $graphcms.request(
      gql`
        {
          stories(orderBy: publishedAt_DESC) {
            id
            title
            content
            source
            tags
          }
        }
      `
    );
    return { stories };
  },
};
</script>
