//responsável por fazer a conexão com o banco de dados 
import 'dotenv/config.js';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; //nunca esquecer de conolar.js no final 
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts () {
    const db = conexao.db("imersao-instabyte"); //da nossa conexao com o banco de dados, pegaremos o respectivo banco
    const colecao = db.collection("posts"); //desse banco de dados vamos pegar o que está dentro da sua gaveta, os posts
    return colecao.find().toArray(); // a função retornará (teurn) o encontro (find) dos posts(colecao) para uma lista (formato)
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabyte") //da nossa conexao com o banco de dados, pegaremos o respectivo banco
    const colecao = db.collection("posts") //desse banco de dados vamos pegar o que está dentro da sua gaveta, os posts
    return colecao.insertOne(novoPost) // a função retornará (teurn) a inserção (insert) dos posts(colecao)

}

export async function alterarPost(id, postAtualizado) {
    const db = conexao.db("imersao-instabyte") //da nossa conexao com o banco de dados, pegaremos o respectivo banco
    const colecao = db.collection("posts") //desse banco de dados vamos pegar o que está dentro da sua gaveta, os posts
    const objectId = ObjectId.createFromHexString(id) //formato que o mongo exige(entende) para guardar o id do post que queremos atualizar
    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set:postAtualizado} ) // a função retornará (teurn) a atualização (update) dos posts(colecao) no formato reconhecido pelo mongo - set (definir): utilizado para indicar que estamos mandando um conjunto de dados para serem atualizados naquele post.

}