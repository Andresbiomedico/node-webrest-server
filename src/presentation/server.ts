
import { create } from 'domain';
import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routers:Router
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private routers:Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port,routers, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routers = routers;
    };

    async start() {

        //* Middlewares 
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // x-wwww-form-urlencoded

        //* Public folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routers);

        //*SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, () => {
            console.log('Server is running on port 3000');
        })
    }

}