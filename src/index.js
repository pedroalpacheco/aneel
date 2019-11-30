const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const { Parser } = require('json2csv');

let dados = [];

async function extracao(site) {
    const html = await request.get(site);
    const $ = await cheerio.load(html);

    for (i = 2; i < 1003; i++) {
        let distribuidora = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim();
        let codigo = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
        let titular = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
        let classe = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
        let subgrupo = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
        let modalidade = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text().trim();
        let credito = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
        let municipio = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text().trim();
        let uf = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(9)`).text().trim();
        let cep = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(10)`).text().trim();
        let data = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(11)`).text().trim();
        let fonte = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(12)`).text().trim();
        let potencia = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(13)`).text().trim();
        let modulo = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(14)`).text().trim();
        let inversores = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(15)`).text().trim();
        let arranjo = $(`body > table > tbody > tr:nth-child(4) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(16)`).text().trim();

        //console.log([distribuidora, codigo, titular, classe, subgrupo, modalidade, credito, municipio, uf, cep, data, fonte, potencia, modulo, inversores, arranjo]);

        dados.push({
            distribuidora, 
            codigo, 
            titular, 
            classe, 
            subgrupo, 
            modalidade, 
            credito, 
            municipio, 
            uf, 
            cep, 
            data, 
            fonte, 
            potencia, 
            modulo, 
            inversores, 
            arranjo
        });
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(dados);
        console.log(dados);
        fs.writeFileSync('./dados-aneel.csv', csv, 'utf8');
        await demora();

    }


}
async function demora(){
    await sleep(1000);
    await console.log(`Passado 1 Segundo...>
    
    `)
}

async function sleep(ml){
    return new Promise (resolve => setTimeout(resolve, ml))
}

let totpgpai = 143
let count = 1

async function extraitodas(){
    while(count <= totpgpai){
        const urlsFilhos = 'http://www2.aneel.gov.br/scg/gd/gd_fonte_detalhe.asp?tipo=12&pagina=' + count;
        // console.log(urlsFilhos);
        await extracao(urlsFilhos);
        count ++
    }
}
extraitodas()
//extracao('http://www2.aneel.gov.br/scg/gd/gd_fonte_detalhe.asp?tipo=12&pagina=1')