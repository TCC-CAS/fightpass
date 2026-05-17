# FightPass Frontend

Frontend estatico em HTML, CSS e JavaScript.

## Deploy recomendado

Use Vercel ou Netlify apontando para esta pasta como raiz do projeto:

```text
fightpass-frontend
```

Configure a variavel de ambiente:

```env
FIGHTPASS_API_BASE_URL=https://seu-backend.up.railway.app/api
```

Depois use:

```text
Build command: npm run build
Output/Publish directory: dist
```

O build copia os arquivos estaticos para `dist` e gera `dist/js/config.js` com a URL publica da API.

## Deploy na Vercel

1. Crie um novo projeto na Vercel a partir do repositorio.
2. Em Root Directory, selecione `fightpass-frontend`.
3. Adicione `FIGHTPASS_API_BASE_URL` com a URL da API no Railway terminando em `/api`.
4. Faça o deploy.

O arquivo `vercel.json` ja define `npm run build` e `dist`.

## Deploy na Netlify

1. Crie um novo site na Netlify a partir do repositorio.
2. Em Base directory, selecione `fightpass-frontend`.
3. Adicione `FIGHTPASS_API_BASE_URL` com a URL da API no Railway terminando em `/api`.
4. Faça o deploy.

O arquivo `netlify.toml` ja define `npm run build` e `dist`.

## Rodar build localmente

```powershell
cd fightpass-frontend
$env:FIGHTPASS_API_BASE_URL="https://seu-backend.up.railway.app/api"
npm run build
```

Para desenvolvimento local, o frontend continua usando `http://localhost:3000/api` por padrao.
