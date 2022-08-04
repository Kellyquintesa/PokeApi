import { useEffect, useState } from "react";
import { Card, message } from "antd";

function PokemonCard({ pokemon }) {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name, url } = pokemon;

  const fetchPokemon = async (url) => {
    if (!url) return;

    setLoading(true);

    try {
      const response = await fetch(url);
      const { sprites } = (await response.json()) || {};
      const image = sprites?.other?.home?.front_default;

      setPokemonData({ image });
    } catch (e) {
      console.error(e);
      message.error(e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(url);
  }, [url]);

  return (
    <Card
      loading={loading}
      cover={
        pokemonData && (
          <img
            alt={name}
            src={pokemonData.image}
            style={{
              width: "auto",
              height: 200,
              margin: "auto",
              padding: 8,
            }}
          />
        )
      }
    >
      <Card.Meta title={name} />
    </Card>
  );
}

export default PokemonCard;
