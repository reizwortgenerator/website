<template>
  <div>
    <pre>{{ stories }}</pre>
    <form @submit.prevent="submitStory">
      <p><input v-model="story.title" type="text" /></p>
      <p><textarea v-model="story.content"></textarea></p>
      <p>
        <select v-model="story.source">
          <option>Sueddeutsche_Kultur</option>
          <option>Bild_Unterhaltung</option>
        </select>
      </p>
      <p><button type="submit">Submit</button></p>
    </form>
  </div>
</template>

<script>
import { gql } from "graphql-request";
export default {
  name: "Stories",

  data() {
    return {
      story: {
        title: "",
        content: "",
        source: "Sueddeutsche_Kultur",
      },
    };
  },

  methods: {
    async submitStory() {
      const {
        createStory: { id },
      } = await this.$graphcms.request(
        gql`
          mutation CreateStory(
            $title: String!
            $content: String!
            $source: Source!
            $tags: [String!]!
          ) {
            __typename
            createStory(
              data: {
                title: $title
                content: $content
                source: $source
                tags: $tags
              }
            ) {
              id
            }
          }
        `,
        {
          title: this.story.title,
          content: this.story.content,
          source: this.story.source,
          tags: [],
        }
      );
      await this.$graphcms.request(
        gql`
        mutation PublishStory($id: ID) {
            __typename
            publishStory(where: {id: $id}) {
                id
            }
        }
        `,
        {
          id
        }
      );
    },
  },

  async asyncData({ $graphcms }) {
    const { stories } = await $graphcms.request(
      gql`
        {
          stories(orderBy: publishedAt_DESC) {
            id
            publishedAt
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
