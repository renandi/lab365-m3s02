import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Typography,
  FormControl,
  Button,
  Box,
  TextareaAutosize,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";

export default function CadastroProdutoForm() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [precoNumerico, setPrecoNumerico] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

  const formatarPreco = (valor) => {
    if (!valor) return "";
    const numero = parseFloat(valor.replace(/\D/g, "")) / 100; // tira tudo que não for número
    return numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePriceChange = (e) => {
    const entrada = e.target.value;

    // Remove tudo que não for dígito e transforma em número
    const valorNumerico = entrada.replace(/\D/g, "");
    const numero = parseFloat(valorNumerico) / 100;

    // Guarda o valor numérico puro
    setPrecoNumerico(isNaN(numero) ? "" : numero);

    // Formata para exibir no input
    setPreco(formatarPreco(valorNumerico));
  };

  function cadastrarProduto() {
    const produto = {
      nome,
      preco: precoNumerico,
      descricao,
      imagem: urlImagem,
    };

    axios
      .post("http://localhost:3001/produtos", produto)
      .then((res) => {
        console.log("Produto cadastrado com sucesso!", res);
        setNome("");
        setDescricao("");
        setPreco("");
        setUrlImagem("");
        setPrecoNumerico(0)
      })
      .catch((err) => console.log("Erro ao cadastrar produto! ", err));

  }

  return (
    <>
      <>
        <Card variant="outlined">
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography as="h1">Cadastro de Produto</Typography>

            <TextField
              fullWidth
              label="Nome do Produto"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            />

            <FormControl sx={{ m: 1 }} fullWidth>
              <InputLabel htmlFor="outlined-adornment-preco">Preço</InputLabel>
              <OutlinedInput
                id="outlined-adornment-preco"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                label="Preço"
                onChange={handlePriceChange}
                value={preco}
              />
            </FormControl>

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Descrição"
              onChange={(e) => setDescricao(e.target.value)}
              value={descricao}
            />

            <TextField
              fullWidth
              label="🔗 URL da Imagem"
              onChange={(e) => setUrlImagem(e.target.value)}
              value={urlImagem}
            />

            <Box style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                endIcon={<AddBoxIcon />}
                onClick={cadastrarProduto}
              >
                Cadastrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </>
    </>
  );
}
