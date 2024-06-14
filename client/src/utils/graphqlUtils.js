import apolloClient from '../apollo';
import { gql } from '@apollo/client/core';
import { errorMessage } from '../utils/message'; // Adjust path as needed

// Helper function to handle GraphQL mutations
export async function handleMutation(mutationQuery, variables) {
  try {
    const { data } = await apolloClient.mutate({
      mutation: gql`${mutationQuery}`,
      variables,
    });
    return data;
  } catch (error) {
    let message = error.message;
    if (error.graphQLErrors) {
      const validationErrors = error.graphQLErrors[0]?.extensions?.validation;
      if (validationErrors) {
        message = formatValidationErrors(validationErrors);
      }
    }
    errorMessage(message);
    throw error;
  }
}

// Helper function to handle GraphQL queries
export async function handleQuery(query, variables) {
  try {
    const { data } = await apolloClient.query({
      query: gql`${query}`,
      variables: variables,
    });
    return data;
  } catch (error) {
    errorMessage(error.message);
    throw error;
  }
}

// Helper function to format validation errors into HTML list
function formatValidationErrors(validationErrors) {
  let errorMessage = 'Validation Error:<ul>';
  for (const key in validationErrors) {
    errorMessage += `<li>${key}: ${validationErrors[key].join(', ')}</li>`;
  }
  errorMessage += '</ul>';
  return errorMessage;
}


