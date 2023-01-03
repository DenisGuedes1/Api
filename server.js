const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter({
  register: 600,
  postDonation: 644,
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verifique se o nome de usuário e a senha foram fornecidos
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Por favor, forneça um nome de usuário e senha" });
  }

  // Verifique as credenciais do usuário contra o banco de dados ou outro mecanismo de autenticação
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (!user) {
    return res
      .status(401)
      .send({ message: "Nome de usuário ou senha inválidos" });
  }

  // Se o login for bem-sucedido, gere um token de acesso e envie-o de volta para o usuário
  const accessToken = generateAccessToken(user.id);
  res.send({ accessToken });
});

console.log("Server is running on port:", port);

/* A senha do Kenzinho é 123456 */
