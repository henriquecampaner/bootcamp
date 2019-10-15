const express = require('express');

const server = express();

server.use(express.json());

//arry
let numberOfRequests = 0;

const projetos = [{
  id: "1",
  title: "novo projeto",
  tasks: [
    "tarafe1"
  ]
},{
  id: "2",
  title: "Projeto2",
  tasks: [
    "tarafe2"
  ]
},
];

//middlewares
function idExists(req, res, next) {
  const {id} = req.params;
  
  if(!projetos[id]){
    res.status(400).json('Project not found.')
  }
  return next();
};

function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

//Rotas
server.get('/projects', (req, res) => {
  return res.json(projetos);
});

server.get('/projects/:id',idExists, (req, res) => {
  const {id} = req.params;

  return res.json(projetos[id]);
});

server.post('/projects', (req,res) =>{
  const {id, title, tasks} = req.body;
  
  const projeto = {
    id,
    title,
    tasks
  }

  projetos.push(projeto)

  return res.json(projetos)
});

server.put('/projects/:id',idExists, (req,res) =>{
  const {title, tasks} = req.body;
  const {id} = req.params;

  const project = projetos.find(p => p.id == id);

  project.title = title;
  project.tasks = tasks

  return res.json(project);
});

server.delete('/projects/:id',idExists, (req,res) =>{
  const {id} = req.params;

  const projectIndex = projetos.findIndex(p => p.id == id);

  projetos.splice(projectIndex, 1);

  return res.send();
});

server.listen(3001, () => {
  console.log('Runnin..')
  
});