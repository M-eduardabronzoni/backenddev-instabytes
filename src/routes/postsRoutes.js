//responsável pelas rotas de requisição
import express from "express";
import multer from "multer";
import cors from "cors";
import {atualizarPost, listarPosts, postarNovoPost, uploadImagem  } from "../controllers/postsControllers.js";

const corsOptions = {
    origin: "http://localhost:8000", //rota vinda do front - avisando o back que vão chegar requisições de 8000
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}) // não precisa para linux ou mac / sem esse trecho de código os posts seriam armazenados com nomes aleatórios, diferentes dos locais 

const upload = multer({ dest: "./uploads" , storage}) //inicializando o multer: como parâmetro informamos onde (pasta) queremos que os arquivos manejados pelo multer sejam salvos. Para isso, passaremos o "destino/caminho" para ele

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarPost)
    
}

export default routes;