/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHrv = /* GraphQL */ `
  query GetHrv($id: ID!) {
    getHRV(id: $id) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const listHrVs = /* GraphQL */ `
  query ListHrVs(
    $filter: ModelHRVFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHRVs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
      }
      nextToken
    }
  }
`;
