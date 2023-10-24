import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import FAB from "../../components/fab";
import Card from "../../components/card";
import Title from "../../components/title";

export interface IPlanets {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents: Array<string>,
  films: Array<string>,
  created: string,
  edited: string,
  url: string
}

const Home = () => {

  const navigate = useNavigate()

  const getPlanets = () => {
    return fetch('https://swapi.dev/api/planets').then(res => res.json())
  }

  const { data, isLoading } = useQuery('getPlanets', getPlanets)

  if (isLoading) return (<Card><Title>Loading...</Title></Card>)

  return (
    <section>
      {data.results.map((item: IPlanets) => (
        <Card key={item.name} onClick={() => navigate("/detail", {state: {url: item.url}})}>
          <Title>{item.name}</Title>
        </Card>
      ))}
      <FAB />
    </section>
  )
}

export default Home