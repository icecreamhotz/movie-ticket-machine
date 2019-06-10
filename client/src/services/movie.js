import { instance as api } from "../config/api";

export default {
  getAllMovies: async () => {
    const requestBody = {
      query: `
        query {
            movies {
                _id,
               name,
                  logo,
                  description,
                  price,
                  soundtrack {
                    _id,
                    title
                  }
              }
          }
        `
    };
    try {
      const movie = await api.post(`/graphql`, JSON.stringify(requestBody));
      return movie.data.data.movies;
    } catch (err) {
      console.log(err);
      alert("something has wrong!");
    }
  }
};
