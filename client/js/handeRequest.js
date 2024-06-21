export const requestHandler = async (promise) => {
  try {
    const response = await promise;
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    alert(`Error: ${error.message}`);
  }
};
