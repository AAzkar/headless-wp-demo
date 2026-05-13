export async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(process.env.WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    //cache: 'no-store',
    next: { revalidate: 60 }
  });

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL fetch failed');
  }

  return json.data;
}