import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import { Button, Col, Layout, message, Row } from "antd";

const { Content } = Layout;

const useFetchPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon");
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async (url) => {
    if (!url) return;

    setLoading(true);

    try {
      const response = await fetch(url);
      const { next = "", results = [] } = (await response.json()) || {};

      setPokemons((prevState) => [...prevState, ...results]);
      setNextPage(next);
    } catch (e) {
      console.error(e);
      message.error(e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(nextPage);
  }, []);

  return {
    pokemons,
    loading,
    nextPage: () => fetchPokemons(nextPage),
  };
};

function App() {
  const { pokemons, loading, nextPage } = useFetchPokemon();

  return (
    <Layout className="layout">
      <h1 style={{ textAlign: "center", margin: "10px", fontSize: "40px" }}>
        Get Your Pokemon
      </h1>
      <Content>
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            {pokemons.map((pokemon) => (
              <Col key={pokemon.url} span={8}>
                <PokemonCard pokemon={pokemon} />
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button
              style={{
                background: "#d3d3d3",
                fontWeight: "bold",
                borderRadius: "15px",
              }}
              onClick={nextPage}
              loading={loading}
            >
              Next
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
