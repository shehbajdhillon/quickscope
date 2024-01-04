import { gql } from "@apollo/client";

export const GET_TEAM_SLUGS = gql`
  query GetTeamSlugs {
    teams {
      teamSlug
    }
  }
`;
