import express, { request, response } from 'express';

const app = express();

app.get('/', (request, response) => {
  console.log('teste');
  
  return response.json({ message: 'teste' });
})

app.listen(4000, () => {
  console.log('Server started on port 4000');
})

