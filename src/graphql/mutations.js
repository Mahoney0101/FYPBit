/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createHrv = /* GraphQL */ `
  mutation CreateHrv(
    $input: CreateHRVInput!
    $condition: ModelHRVConditionInput
  ) {
    createHRV(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateHrv = /* GraphQL */ `
  mutation UpdateHrv(
    $input: UpdateHRVInput!
    $condition: ModelHRVConditionInput
  ) {
    updateHRV(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteHrv = /* GraphQL */ `
  mutation DeleteHrv(
    $input: DeleteHRVInput!
    $condition: ModelHRVConditionInput
  ) {
    deleteHRV(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const createUserStats = /* GraphQL */ `
  mutation CreateUserStats(
    $input: CreateUserStatsInput!
    $condition: ModelUserStatsConditionInput
  ) {
    createUserStats(input: $input, condition: $condition) {
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
export const updateUserStats = /* GraphQL */ `
  mutation UpdateUserStats(
    $input: UpdateUserStatsInput!
    $condition: ModelUserStatsConditionInput
  ) {
    updateUserStats(input: $input, condition: $condition) {
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
export const deleteUserStats = /* GraphQL */ `
  mutation DeleteUserStats(
    $input: DeleteUserStatsInput!
    $condition: ModelUserStatsConditionInput
  ) {
    deleteUserStats(input: $input, condition: $condition) {
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
