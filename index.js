import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./data/db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./data/db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.get("/empleados", (req, res) => {
    const data = readData();
    res.json(data.empleados);
});

app.get("/empleados/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const empleado = data.empleados.find((empleado) => empleado.id === id);
    res.json(empleado);
});

app.post("/empleados", (req, res) => {
    const data = readData();
    const body = req.body;
    const nuevoEmpleado = {
        id: data.empleados.length + 1,
        ...body,
    };
    data.empleados.push(nuevoEmpleado);
    writeData(data);
    res.json(nuevoEmpleado);
});

app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const empleadoIndex = data.empleados.findIndex((empleado) => empleado.id === id);
    data.empleados[empleadoIndex] = {
        ...data.empleados[empleadoIndex],
        ...body,
    };
    writeData(data);
    res.json({message: "Empleado actualizado correctamente"});
});

app.delete("/empleados/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const empleadoIndex = data.empleados.findIndex((empleado) => empleado.id === id);
    data.empleados.splice(empleadoIndex, 1);
    writeData(data);
    res.json({ message: "Empleado eliminado correctamente" });
})

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});