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
export const createRhr = /* GraphQL */ `
  mutation CreateRhr(
    $input: CreateRHRInput!
    $condition: ModelRHRConditionInput
  ) {
    createRHR(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateRhr = /* GraphQL */ `
  mutation UpdateRhr(
    $input: UpdateRHRInput!
    $condition: ModelRHRConditionInput
  ) {
    updateRHR(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteRhr = /* GraphQL */ `
  mutation DeleteRhr(
    $input: DeleteRHRInput!
    $condition: ModelRHRConditionInput
  ) {
    deleteRHR(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const createTemperature = /* GraphQL */ `
  mutation CreateTemperature(
    $input: CreateTemperatureInput!
    $condition: ModelTemperatureConditionInput
  ) {
    createTemperature(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateTemperature = /* GraphQL */ `
  mutation UpdateTemperature(
    $input: UpdateTemperatureInput!
    $condition: ModelTemperatureConditionInput
  ) {
    updateTemperature(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteTemperature = /* GraphQL */ `
  mutation DeleteTemperature(
    $input: DeleteTemperatureInput!
    $condition: ModelTemperatureConditionInput
  ) {
    deleteTemperature(input: $input, condition: $condition) {
      id
      value
      createdAt
      updatedAt
    }
  }
`;
export const createModelPrediction = /* GraphQL */ `
  mutation CreateModelPrediction(
    $input: CreateModelPredictionInput!
    $condition: ModelModelPredictionConditionInput
  ) {
    createModelPrediction(input: $input, condition: $condition) {
      id
      prediction
      createdAt
      updatedAt
    }
  }
`;
export const updateModelPrediction = /* GraphQL */ `
  mutation UpdateModelPrediction(
    $input: UpdateModelPredictionInput!
    $condition: ModelModelPredictionConditionInput
  ) {
    updateModelPrediction(input: $input, condition: $condition) {
      id
      prediction
      createdAt
      updatedAt
    }
  }
`;
export const deleteModelPrediction = /* GraphQL */ `
  mutation DeleteModelPrediction(
    $input: DeleteModelPredictionInput!
    $condition: ModelModelPredictionConditionInput
  ) {
    deleteModelPrediction(input: $input, condition: $condition) {
      id
      prediction
      createdAt
      updatedAt
    }
  }
`;
