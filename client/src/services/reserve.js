import { instance as api } from "../config/api";

export default {
  reserveTicket: async ({
    email,
    price_total,
    money,
    change_total,
    people_total,
    createdAt,
    movieId
  }) => {
    const requestBody = {
      query: `
                mutation
                {
                    reserveMovie(email: "${email}", 
                    price_total: ${price_total},
                    money: ${money},
                    change_total: ${change_total},
                    people_total: ${people_total},
                    createdAt: "${createdAt}", 
                    movie: "${movieId}"){
                        _id,
                        email {
                            email
                        },
                        price_total,
                        change_total,
                        people_total,
                        createdAt,
                        movie {
                            name
                        }
                    }
                }
            `
    };
    try {
      const reserve = await api.post("/graphql", JSON.stringify(requestBody));
      console.log(reserve);
      const reserveData = reserve.data.data.reserveMovie;
      localStorage.setItem("receipt", reserveData._id);
      return reserveData;
    } catch (err) {
      alert("something has wrong");
      throw new Error(err);
    }
  },
  getReserveById: async _id => {
    const requestBody = {
      query: `
        query {
          reserveMovieById(_id: "${_id}") {
            price_total,
            money,
            change_total,
            people_total,
            createdAt,
            movie {
              name
            }
            email{
              email
            }
          }
        }
      `
    };
    try {
      const reserve = await api.post("/graphql", JSON.stringify(requestBody));
      return reserve.data.data.reserveMovieById;
    } catch (err) {
      alert("something has wrong");
      throw new Error(err);
    }
  }
};
