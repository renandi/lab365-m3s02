import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
} from "@mui/material";
import axios from "axios";

export default function CardProduto({ id, nome, preco, descricao, imagem, onDelete }) {
  function deletar() {
    if (confirm("Tem certeza que deseja excluir?")) {
      axios
        .delete(`http://localhost:3001/produtos/${id}`)
        .then(() => {
          console.log("Produto excluido com sucesso!");
          onDelete(id);
        })
        .catch((err) => console.log("Erro ao deletar produto! ", err));
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`https://picsum.photos/seed/${nome.replace(`"`, "")}/800/800`}
        title={nome}
      />

      <CardContent style={{ textAlign: "left" }}>
        <Typography gutterBottom variant="h5" component="div">
          {nome}
        </Typography>

        <Typography>
          {preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
          })}
        </Typography>

        <Typography
          variant="body"
          sx={{ color: "text.secondary" }}
          textAlign={"justify"}
        >
          {descricao}
        </Typography>
      </CardContent>

      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button size="small">Editar</Button>
        <Button size="small" onClick={deletar}>
          Deletar
        </Button>
      </CardActions>
    </Card>
  );
}
