import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import FAB from "../../components/fab";
import Card from "../../components/card";
import Title from "../../components/title";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

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

interface IResponse {
  count: number,
	next: string,
	previous: string,
	results: Array<IPlanets>
}

const Home = () => {

  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [planets, setPlanets] = useState<IResponse>({count: 0, next: '', previous: '', results: []})

  const getPlanets = () => {
    return fetch(`https://swapi.dev/api/planets/?page=${page}`).then(res => res.json())
  }

  const { data, isLoading } = useQuery(['getPlanets', page], getPlanets)

  useEffect(() => {
    if (data) {
      setPlanets({...data, results: [...planets?.results, ...data.results]})
    }
  }, [data])

  if (isLoading && planets.results.length === 0) return (<Card><Title>Loading...</Title></Card>)

  return (
    <section>
      <InfiniteScroll
        dataLength={planets?.results?.length}
        next={() => setPage(page+1)}
        hasMore={!!planets?.next}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>End of data</b>
          </p>
        }
      >
        {planets?.results?.map((item: IPlanets) => (
          <Card key={item.name} onClick={() => navigate("/detail", {state: {url: item.url}})}>
            <Title>{item.name}</Title>
          </Card>
        ))}
      </InfiniteScroll>
      <FAB />
    </section>
  )
}

export default Home