# MLRequest
> Api NodeJs para Consulta a Produtos no Mercado Livre.


## Instalação

npm install

## Como utilizar

```
npm start
```

Ao iniciar a api irá disponibilizar um Endpoint em http://localhost:3001/search que espera um post no formato

```
{
  "search": String, // termo usado na busca
  "limit": Int // número de registros retornados max 50
}
```

Retorno esperado:
````
[
  {
    "name": String, // Nome do produto
    "link": String, // Link do produto
    "price": Number, // Preço
    "store": String, // Nome da loja, se houver
    "state": String // Estado, se houver
  }
]
````


## Configurações de Desenvolvimento

TTD - Monitorar testes em tempo de produção

```
npm  run secure-mode
```

## Release

* 0.0.1
    * Tudo começou aqui.

## Dados

Alan Fernandes – [@Linkedin](https://www.linkedin.com/in/alan-fernandes-78153a22/) – alan@alanfernandes.com.br