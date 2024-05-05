import express from 'express';
import {sendLineNotify} from './cdn/line.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5678;

app.use(express.json());

app.use('/cdn', express.static(__dirname + '/cdn'));

// app.get('/event-register.js', (req, res) => {
//     res.sendFile(__dirname + '/cdn/event-register.js');
// });


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
