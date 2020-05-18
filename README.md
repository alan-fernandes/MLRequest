# MLRequest
> Api de Consulta a Produtos no Mercado Livre.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]


## Instalação

npm start

## Como utilizar

Ao iniciar a api disponibiliza um Endpoint em http://localhost:3001/search que espera um post no formato

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


## Development setup

TTD - Monitorar testes em tempo de produção

```
npm  run secure-mode
```

## Release History

* 0.0.1
    * Tudo começou aqui.

## Meta

Alan Fernande – [@Linkedin](https://www.linkedin.com/in/alan-fernandes-78153a22/) – alan@alanfernandes.com.br