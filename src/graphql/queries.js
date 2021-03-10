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
      #id
      value
      #createdAt
      #updatedAt
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
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserStats = /* GraphQL */ `
  query GetUserStats($id: ID!) {
    getUserStats(id: $id) {
      id
      username
      height
      weight
      age
      createdAt
      updatedAt
    }
  }
`;
export const listUserStatss = /* GraphQL */ `
  query ListUserStatss(
    $filter: ModelUserStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserStatss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        height
        weight
        age
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRhr = /* GraphQL */ `
  query GetRhr($id: ID!) {
    getRHR(id: $id) {
      #id
      value
      #createdAt
     # updatedAt
    }
  }
`;
export const listRhRs = /* GraphQL */ `
  query ListRhRs(
    $filter: ModelRHRFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRHRs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
