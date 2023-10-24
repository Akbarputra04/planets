import { useState } from "react";
import ReactPaginate from "react-paginate";
import { IPlanets } from "../../pages/home";
import { useNavigate } from "react-router-dom";
import Card from "../card";
import Title from "../title";
import styled from "styled-components";

interface IPaginate {
  data: Array<IPlanets>
  itemsPerPage: number
}

const Pagination = ({ data, itemsPerPage }: IPaginate) =>  {

  const navigate = useNavigate()

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const Paginate = styled(ReactPaginate).attrs({
    activeClassName: 'active', // default to "selected"
  })`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    list-style-type: none;
    padding: 0 5rem;
  
    li a {
      border-radius: 7px;
      padding: 0.1rem 1rem;
      border: gray 1px solid;
      cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #0366d6;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;

  return (
    <>
      {currentItems.map((item: IPlanets) => (
        <Card key={item.name} onClick={() => navigate("/detail", {state: {url: item.url}})}>
          <Title>{item.name}</Title>
        </Card>
      ))}
      <Paginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
      />
    </>
  );
}

export default Pagination