export const getNotification = async () => {
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/notificationweb');
      if (!response.ok) {
        throw new Error('Data not fetched from API');
      }
      const data = await response.json();
      setSubmissions(data.data); // Assuming data.data is an array
    } catch (error) {
      setError(error.message); // Set the error message
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };