//responsável por receber as requisições e responder - responsável por uniar as rotas com os dados
import {getTodosPosts, criarPost, alterarPost} from "../model/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../../services/geminiService.js";

 export async function listarPosts (req, res) {
    const posts = await getTodosPosts() //resultado da função
    res.status(200).json(posts);
}

export async function postarNovoPost (req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem (req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalName,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada) //para atualizar na nossa máquina o nome do upload, de acordo com o caminho da requisição
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.massage);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizarPost (req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado = {
            descricao: descricao,
            imgUrl: urlImagem,
            alt: req.body.alt
        } // essas informações chegarão através da requisição (put) do postman ou front-end
        const postCriado = await alterarPost(id, postAtualizado);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}