import React, { useEffect, useState } from "react";
import ReserveServices from "../../services/reserve";
import "./ticket.scss";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";

const { Title } = Typography;

const ReceiptLoader = () => (
  <div className="cardWrap">
    <div className="cardTicket cardLeft">
      <ContentLoader
        speed={2}
        primaryColor="#ffff80"
        secondaryColor="#ff8040"
        height={400}
        width={400}
      >
        <rect x="1" y="20" width="200" height="15" />
        <rect x="1" y="100" width="200" height="10" />
        <rect x="1" y="140" width="150" height="8" />
        <rect x="1" y="180" width="200" height="10" />
        <rect x="1" y="220" width="150" height="8" />
        <rect x="1" y="300" width="100" height="10" />
        <rect x="1" y="340" width="140" height="8" />
        <rect x="150" y="300" width="100" height="10" />
        <rect x="150" y="340" width="140" height="8" />
      </ContentLoader>
    </div>
    <div className="cardTicket cardRight">
      <ContentLoader
        speed={2}
        primaryColor="#ffff80"
        secondaryColor="#ff8040"
        height={600}
        width={400}
      >
        <circle cx="200" cy="60" r="50" />
        <rect x="100" y="300" width="200" height="50" />
        <rect x="120" y="390" width="150" height="25" />
        <rect x="50" y="500" width="300" height="100" />
      </ContentLoader>
    </div>
  </div>
);

const ReceiptComponent = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const reserve = await ReserveServices.getReserveById(
        localStorage.receipt
      );
      setMovie(reserve);
      setLoading(false);
    };
    if (localStorage.receipt) {
      fetchData();
    }
  }, []);
  if (loading && localStorage.receipt) return <ReceiptLoader />;
  return (
    <div>
      {movie !== null && (
        <div className="cardWrap">
          <div className="cardTicket cardLeft">
            <h1>
              Thinknet <span>Cinema</span>
            </h1>
            <div className="title">
              <h2>{movie.movie.name}</h2>
              <span>movie</span>
            </div>
            {movie.email !== null && (
              <div className="name">
                <h2>{movie.email.email}</h2>
                <span>email</span>
              </div>
            )}
            <div className="seat">
              <h2>{movie.people_total}</h2>
              <span>seat</span>
            </div>
            <div className="time">
              <h2>{movie.price_total}</h2>
              <span>PRICE</span>
            </div>
          </div>
          <div className="cardTicket cardRight">
            <div className="eye" />
            <div className="number">
              <h3>{movie.people_total}</h3>
              <span>seat</span>
            </div>
            <div className="barcode" />
          </div>
          <Title level={4} align="center">
            <Link to="/">Buy Ticket Again.</Link>
          </Title>
        </div>
      )}
      {movie === null && (
        <div className="cardWrap">
          <Title level={5}>
            Have no ticket, Maybe you need to buy ticket first.
          </Title>
          <Title level={4}>
            <Link to="/">Buy Ticket Now.</Link>
          </Title>
        </div>
      )}
    </div>
  );
};
export default ReceiptComponent;
