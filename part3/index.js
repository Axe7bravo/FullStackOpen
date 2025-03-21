const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(express.json());
app.use(express.static('dist'));

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body)
    }
    return '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": "5",
        "name": "Larry Poppendieck", 
        "number": "39-23-6423122"
    }
];

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

app.get('/', (request, response) => {
    response.send('<h1>Phone book!</h1>')
  });
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  });

app.get('/info', (request, response) => {
    const requestTime = new Date();
    const phonebookEntryCount = persons.length;
  
    response.send(`
      <p>Phonebook has info for ${phonebookEntryCount} people</p>
      <p>${requestTime}</p>
    `);
  });

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).send('Note not found');
      }
  });

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    person = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  });

  app.post('/api/persons', (request, response) => {
    const body = request.body;
  
    if (!body.name) {
      return response.status(400).json({ error: 'name missing' });
    }
  
    if (!body.number) {
      return response.status(400).json({ error: 'number missing' });
    }
  
    const nameExists = persons.some(person => person.name === body.name);
  
    if (nameExists) {
      return response.status(400).json({ error: 'name must be unique' });
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };
  
    persons = persons.concat(person);
  
    response.json(person);
  });

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint);
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });