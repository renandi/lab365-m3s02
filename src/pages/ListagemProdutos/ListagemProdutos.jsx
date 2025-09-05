import axios from "axios";
import React, { useEffect, useState } from "react";
import CardProduto from "../../components/CardProduto";
import { Box, TextField, Typography } from "@mui/material";

export default function ListagemProdutos() {
  const [produtos, setProdutos] = useState([]);

  const [busca, setBusca] = useState("");

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

  const produtosFiltrados = produtos.filter ((p)=> p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <Typography variant="h4" marginBottom="20px">Listagem de Produtos</Typography>

      <TextField
        label="Buscar produto"
        variant="outlined"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {produtosFiltrados.map((p) => (
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

        {produtosFiltrados.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )
        }
      </div>
    </>
  );
}
