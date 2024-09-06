import { useState, useEffect } from "react";
import axios from "axios";



const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const options = {
    method: 'GET',
    // url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/${endpoint}`,
    // params: {number: '10'},
    params: { ...query },
    headers: {
      'x-rapidapi-key': '<your key>',
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };


  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
