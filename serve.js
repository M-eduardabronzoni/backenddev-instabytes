import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express(); //onde está guardada toda a lógica e propriedades do express
app.use(express.static("uploads"));
routes(app)

app.listen(3000, () => {
    console.log("Servidor está ouvindo...");
});



// function buscarPostPorId (id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     })
// };

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostPorId(req.params.id)
//     if (index === -1) {
//         // Se o índice for -1, significa que o post não foi encontrado
//         res.status(404).json({ message: "Post não encontrado" });
//     } else {
//         // Se o índice for válido, retorne o post correspondente
//         res.status(200).json(posts[index]);
//     }
// });