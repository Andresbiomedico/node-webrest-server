# Dev
1. Clonar el .env .template y crear el env.

2. desplegar en Railway  https://railway.app/

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

3. link de prisma https://www.prisma.io/

```
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql
```

4. nos crea una carpeta prisma y dentro un archivo schema.prisma en este cambiamos la variable por la q tengamos en el env en mi caso POSTGRES_URL

5. creamos los modelos 

6 corremos el comando

``` 
npx prisma migrate dev --name init
```