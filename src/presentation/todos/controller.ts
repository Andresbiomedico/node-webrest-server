import { Request, Response } from 'express';
import { prisma } from '../../data';
import { CreateTodoDto, UpdateTodoDto } from '../../domanin/dtos';
interface Todo {
    id: number;
    text: string;
    completedAt: Date | null;
}
const todos: Todo[] = [
    { id: 1, text: 'buy milk', completedAt: new Date() },
    { id: 2, text: 'buy milk', completedAt: new Date() },
    { id: 3, text: 'buy milk', completedAt: new Date() },
];
export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();
        res.json(todos)
    };
    public getTodosById = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) {
            res.sendStatus(404).json({ error: 'id is not a number' });
            return
        }
        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            res.status(404).json({ error: 'todo not found' });
            return
        }
        res.json(todo)
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
           res.status(400).json({ error });    
        }
        const newTodo = await prisma.todo.create({
            data: createTodoDto!  
        });

        // const newTodo = {
        //     id: todos.length + 1,
        //     text, completedAt: new Date()
        // };
        // todos.push(newTodo);

        res.json(newTodo);
    }

    public updateTodo = async (req: Request, res: Response) => { 
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body,id});

        if (error){
            res.status(400).json({error});
            return
        } 

        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo){
            res.status(404).json({ error: 'todo not found' });
            return
        } 
            

        const updatedTodo = await  prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });

        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        console.log('put')
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(404).json({ error: 'id is not a number' });
            return
        }
        
        // const todo = todos.find(todo => todo.id === id);

        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) {
            res.status(404).json({ error: 'todo not found' });
            return
        }
        // todos.splice(todos.indexOf(todo), 1);

        const deleteTodo = await prisma.todo.delete({ where: { id } });

        (deleteTodo)
        ? res.json(deleteTodo)
        : res.status(400).json({error:`Todo with id ${id} not deleted`});
           
    }

}