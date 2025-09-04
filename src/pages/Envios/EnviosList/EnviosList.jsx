import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export default function EnvioList() {
  const [envios, setEnvios] = useState([]);

  const navigate = useNavigate();

  function buscarEnvios() {
    axios
      .get("http://localhost:3001/envios")
      .then((res) => {
        setEnvios(res.data);
      })
      .catch(() => {
        console.log("Erro ao obter envios!");
      });
  }

  useEffect(() => {
    buscarEnvios();
  }, []);

  function deletarEnvio(id) {
    if (confirm("Tem certeza que deseja deletar?")) {
      axios
        .delete(`http://localhost:3001/envios/${id}`)
        .then(() => {
          alert("Deletado com sucesso!");
          buscarEnvios();
        })
        .catch(() => alert("Falha ao deletar!"));
    }
  }

  function redirecionarParaEdicao (id) {
    navigate(`/envios/editar/${id}`);
  }

  return (
    <div>
      Tela de listagem
      <Card>
        <CardContent>
          <Typography></Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Itens</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {envios.map((envio) => (
                  <TableRow key={envio.id}>
                    <TableCell>{envio.id}</TableCell>
                    <TableCell>{envio.cliente_nome}</TableCell>
                    <TableCell>{envio.produtos_clientes.length}</TableCell>
                    <TableCell>
                      {envio.valor_total?.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        style={{ color: "red" }}
                        onClick={() => deletarEnvio(envio.id)}
                      />
                      <EditIcon style={{color: "#55F"}} onClick={()=>redirecionarParaEdicao(envio.id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
