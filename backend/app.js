const express = require("express");
const cors = require("cors");
const app = express();



const corsOptions = {
  origin: "*", // Permite qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public")); // Serve arquivos estáticos (como imagens, etc.)

require("./db/conn");

const convidadosRoutes = require("./routes");

app.use("/convidados", convidadosRoutes);

// Porta do servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
