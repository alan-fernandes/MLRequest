const URI = require("uri-js");
const fetch = require('node-fetch');
const winston = require('winston');
const uuid = require('uuidv4');
const app = require('../../app');

app.log = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console(
            { format: winston.format.json({ space: 1 }) }),
        new winston.transports.File(
            {
                filename: 'logs/errors.log',
                level: 'warn',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json({ space: 1 }))
            }),
    ]
})

module.exports = {
    async search(req, res) {

        var { search, limit } = req.body;
        if (typeof search !== 'string') {
            return res.status(400).json({ error: 'Search é obrigatório e precisa ser alfanumérico' });
        }
        if (typeof limit !== 'number') {
            return res.status(400).json({ error: 'Limit é obrigatório e precisa ser inteiro' });
        }
        var search = search.replace(/[^0-9a-zA-Zs]/g, "")
        search = URI.serialize(URI.parse(search));

        var url = 'https://api.mercadolibre.com/sites/MLB/search?q=' + search + '&limit=1';
        const total = await fetch(url)
            .then(res => res.json())
            .then(data => {
                return data.paging.total
            })
            .catch(err => {
                // res.send(err);
                app.log.error(err + 'formato da url inválido');
                return res.status(404).json({ error: 'Sem resultado disponível' });
            });
        console.log(total);
        if (limit > total) {
            app.log.error(`Search: ${search}  Limit de ${limit} é maior que a quantidade de produtos disponíveis ${total}`);
            limit = total;
        }
        if (limit > 50) {
            app.log.error(`Search: ${search} Limit solicitado ajustado por ser superior ao permitido no Mercado Livre 50`);
            limit = 50;
        }

        var url = 'https://api.mercadolibre.com/sites/MLB/search?q=' + search + '&limit=' + limit;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const produtos = data.results.map(item => {
                    let store = item.seller.hasOwnProperty('eshop') ? item.seller.eshop.nick_name : '';
                    return {
                        name: item.title,
                        link: item.permalink,
                        price: item.price,
                        store: store,
                        state: item.address.state_name,
                    }

                }

                )
                res.send(produtos);
            })
            .catch(err => {
                app.log.error(err + ' Formatação de retorno com valores invalidos');
            });

    },



}