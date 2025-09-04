import axios from "axios";
import React, { useEffect, useState } from "react";
import CardProduto from "../../components/CardProduto";
import { Box, Typography } from "@mui/material";

export default function ListagemProdutos() {
  const [produtos, setProdutos] = useState([]);

  function buscarProdutos() {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.log("Erro ao obter produtos! ", err));
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  function handleDeleteProduto() {
    buscarProdutos();
  }

  return (
    <>
      <Typography variant="h2">Listagem de Produtos</Typography>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {produtos.map((p) => (
          <CardProduto
            key={p.id}
            id={p.id}
            nome={p.nome}
            preco={p.preco}
            descricao={p.descricao}
            imagem={p.imagem}
            onDelete={handleDeleteProduto}
          />
        ))}
      </div>
    </>
  );
}
