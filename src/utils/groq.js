export const requestToGroq = async (query) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data; // this matches reply.choices[0].message
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw error;
  }
};