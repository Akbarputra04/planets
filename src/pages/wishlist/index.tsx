import { useQuery } from "react-query";
import Card from "../../components/card";
import Title from "../../components/title";
import { IPlanets } from "../home";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination";

const Wishlist = () => {

  const navigate = useNavigate()

  const getWishlist = () => {
    return JSON.parse(localStorage.getItem('wishlist') || "[]");
  }

  const { data, isLoading } = useQuery('getWishlist', getWishlist)

  if (isLoading) return (<Card><Title>Loading...</Title></Card>)

  return (
    <section>
      <Pagination data={data} itemsPerPage={5} />
    </section>
  )
}

export default Wishlist