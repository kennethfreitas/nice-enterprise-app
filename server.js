const crypto = require("crypto");
const httpProxy = require("http-proxy");
const cors = require("cors");
const express = require("express");
const chance = require("chance").Chance();

const app = express();

app.use(cors());
app.use(express.json());

const proxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true,
});

const PORT = process.env.PORT || 3000;
const CLIENTS = Array(50)
  .fill()
  .map(() => ({
    id: crypto.randomUUID(),
    name: chance.name(),
    company: chance.company(),
    role: chance.profession({ rank: true }),
  }));

function findClientIndex(id) {
  const index = CLIENTS.findIndex((client) => client.id === id);
  if (index < 0)
    throw { status: 404, message: `Client with ID: ${id} - does not exists.` };
  return index;
}

function paginateClients(search = "", page, perPage) {
  const clients = CLIENTS.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
  const currentPage = page > 0 ? +page : 1;
  const itemsPerPage = +perPage || 10;

  return {
    page: currentPage,
    totalPages: Math.round(clients.length / itemsPerPage),
    perPage: itemsPerPage,
    results: items.length,
    items: clients.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage
    ),
  };
}

app
  .route("/api/clients")
  .get((req, res) => {
    const { search, page, perPage } = req.query;
    res.json(paginateClients(search, page, perPage));
  })
  .post((req, res) => {
    const id = crypto.randomUUID();
    CLIENTS.push({ ...req.body, id });
    res.status(201).json({ id });
  });

app
  .route("/api/clients/:id")
  .get((req, res) => {
    const index = findClientIndex(req.params.id);
    res.json(CLIENTS[index]);
  })
  .put((req, res) => {
    const { id } = req.params;
    const index = findClientIndex(id);
    CLIENTS[index] = { ...req.body, id };
    res.status(204).json({});
  })
  .delete((req, res) => {
    const index = findClientIndex(req.params.id);
    CLIENTS.splice(index, 1);
    res.status(204).json({});
  });

app.all("/odata/*", (req, res) => {
  req.url = req.url.replace("/odata", "");
  proxy.web(req, res, {
    target:
      "https://services.odata.org/V2/(S(nmc0iuswtzhcjjxqzc3oxwzr))/OData/OData.svc/",
  });
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Something get really wrong!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
