import express, { Request, Response } from 'express';
import cors from 'cors';

import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req: Request, res: Response) => { res.json({ message: 'Olá, Mundo!' }) })

app.listen(3333);
