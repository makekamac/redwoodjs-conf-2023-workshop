import type { TypePolicies } from '@apollo/client'

export const typePolicies: TypePolicies = {
  CurrentUser: {
    keyFields: [],
  },
  PlaybackState: {
    keyFields: [],
  },
  Player: {
    keyFields: [],
  },
  Playlist: {
    fields: {
      tracks: {
        keyArgs: false,
        merge: (existing, incoming, { mergeObjects }) => {
          const existingEdges = existing?.edges ?? []
          const result = {
            __typename: incoming.__typename,
            edges: [...existingEdges, ...incoming.edges],
            pageInfo: mergeObjects(existing?.pageInfo, incoming.pageInfo),
          }
          return result
        },
      },
    },
  },
}
