// import React, { useState } from "react";
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EnvioForm() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteSelecionado, setClientSelecionado] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [brindes, setBrindes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/clientes")
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar clientes! ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar produtos! ", err);
      });
  }, []);

  function adicionarProduto() {
    if (!produtoSelecionado) {
      alert("Selecione um produto!");
      return;
    }

    setBrindes([...brindes, produtoSelecionado]);
  }

//   console.log(brindes);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography as="h1">Cadastro de Produto</Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="cliente">Cliente</InputLabel>
            <Select
              labelId="cliente"
              label="Cliente"
              value={clienteSelecionado}
              onChange={(e) => setClientSelecionado(e.target.value)}
            >
              {clientes.map((cli) => (
                <MenuItem key={cli.id} value={cli.id}>
                  {cli.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box style={{ display: "flex", gap: "10px" }}>
            <FormControl fullWidth>
              <InputLabel id="produto">Produto</InputLabel>
              <Select
                labelId="produto"
                label="Produto"
                value={produtoSelecionado}
                onChange={(e) => {
                    setProdutoSelecionado(e.target.value)
                }}
              >
                {produtos.map((prod) => (
                  <MenuItem key={prod.id} value={prod.id}>
                    {prod.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              endIcon={<AddBoxIcon />}
              onClick={adicionarProduto}
            >
              Adicionar
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {brindes.map((prod) => (
                  <TableRow>
                    <TableCell>{prod.nome}</TableCell>
                    <TableCell>R$ {prod.preco}</TableCell>
                    <TableCell>
                      <DeleteIcon style={{ color: "red" }} />
                    </TableCell>
                  </TableRow>
                ))} */}
                <TableRow>
                  <TableCell>Boneco mascote</TableCell>
                  <TableCell>R$ 12,00</TableCell>
                  <TableCell>
                    <DeleteIcon style={{ color: "red" }} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Caneca customizada</TableCell>
                  <TableCell>R$ 15,00</TableCell>
                  <TableCell>
                    <DeleteIcon style={{ color: "red" }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            gap="20px"
            style={{ marginTop: "20px" }}
          >
            <Typography>Valor total dos mimos: R$ 12,00</Typography>
            <Button variant="outlined">Enviar para análise</Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
