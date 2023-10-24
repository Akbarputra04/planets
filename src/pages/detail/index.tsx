import { styled } from "styled-components"
import { useQuery } from 'react-query';
import { useLocation } from "react-router-dom";
import FAB from "../../components/fab";
import Card from "../../components/card";
import Title from "../../components/title";
import { IPlanets } from "../home";

const formatNumber = (num: string) => {
  return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const Detail = () => {

  const { state } = useLocation()

  const getPlanetDetail = () => {
    return fetch(state.url).then(res => res.json())
  }
  const getWishlist = () => {
    return JSON.parse(localStorage.getItem('wishlist') || "[]");
  }

  const { data, isLoading } = useQuery('getPlanetDetail', getPlanetDetail)
  const { data: dataWishlist, refetch: refetchWishlist } = useQuery('getWishlist', getWishlist)

  const checkWishlist = () => {
    return dataWishlist.find((item: IPlanets) => item.name === data.name)
  }

  const toggleWishlist = () => {
    if (checkWishlist()) {
      const removedList = dataWishlist.filter((item: IPlanets) => item.name !== data.name)
      localStorage.setItem('wishlist', JSON.stringify(removedList))
      alert('deleted from wishlist')
    } else {
      localStorage.setItem('wishlist', JSON.stringify([...dataWishlist, {name: data.name, url: data.url}]))
      alert('added to wishlist')
    }
    refetchWishlist()
  }

  const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
  `

  const CardButton = styled.div<{ wishlist?: boolean; }>`
    font-size: 3rem;
    height: 100%;
    cursor: pointer;
    filter: ${props => props.wishlist ? 'grayscale(0)' : 'grayscale(100%)'};
    
    &:hover {
      filter: grayscale(0);
    }
  `

  const Description = styled.p`
    font-size: 1rem;
    margin: 0;
  `

  const BadgeWrapper = styled.div`
    display: flex;
    gap: 8px;
  `

  const Badge = styled.div`
    padding: 8px;
    background: #fbe5c0;
    color: #BF4F74;
    border-radius: 4px;
  `
  
  if (isLoading) return (<Card><Title>Loading...</Title></Card>)

  return (
    <section>
      <Card>
        <CardContent>
          <Title>
            <CardButton wishlist={checkWishlist()} title={checkWishlist() ? "delete from wishlist" : "add to wishlist"} onClick={toggleWishlist}>❤️</CardButton>
            {data.name}
          </Title>
          <Description><b>Diameter:</b> {formatNumber(data.diameter)}</Description>
          <Description><b>Rotation period:</b> {formatNumber(data.rotation_period)}</Description>
          <Description><b>Orbital period:</b> {formatNumber(data.orbital_period)}</Description>
          <Description><b>Population:</b> {formatNumber(data.population)}</Description>
          <Description><b>Climate:</b> {data.climate}</Description>
          <Description><b>gravity:</b> {data.gravity}</Description>
          <Description><b>Surface Water:</b> {data.surface_water}</Description>
          <Description><b>Terrain:</b></Description>
          <BadgeWrapper>
            {data.terrain.split(',').map((item: string) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </BadgeWrapper>
        </CardContent>
      </Card>
      <FAB />
    </section>
  )
}

export default Detail