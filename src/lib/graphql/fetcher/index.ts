import config from 'temp/config';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T>(
  query: string,
  variables: object = {}
): Promise<GraphQLResponse<T>> {
  try {
    const response = await fetch(config.graphQLEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        sc_apikey: config.sitecoreApiKey,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<T> = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching GraphQL data:', error);
    throw error;
  }
}
