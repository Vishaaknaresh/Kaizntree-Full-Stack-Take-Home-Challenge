// Function for error handling and type safety for saving data to localStorage
export const saveDataToLocalStorage = <T>(key: string, data: T): void => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error saving data to localStorage for key "${key}":`, error);
    }
  };
  
  // Function for error handling and type safety for loading data from localStorage
  export const loadDataFromLocalStorage = <T>(key: string): T | null => {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) as T : null;
    } catch (error) {
      console.error(`Error loading data from localStorage for key "${key}":`, error);
      return null; // Return null in case of error to maintain function signature
    }
  };
  