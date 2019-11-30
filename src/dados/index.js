const mysql = require('mysql');
const csv = require('csv-parser');
const fs = require('fs');

const conPonto = (numbers)=>{
    return numbers.replace(",",".")
}

function formatadata(data){ // 10/11/2019 mysql 2019-11-10
    const dia = data.split("/")[0];
    const mes = data.split("/")[1];
    const ano = data.split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
}


const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'12345',
    database:'aneelsolar'
});

function gravando(linhas){

    const numponto = conPonto(linhas.arranjo);
    const dtconvertida = formatadata(linhas.data);
    const numpotencia = conPonto(linhas.potencia)


    const dados = {
            distribuidora:linhas.distribuidora, 
            codigo: linhas.codigo,
            titular: linhas.titular,
            classe: linhas.classe,
            subgrupo: linhas.subgrupo,
            modalidade: linhas.modalidade,
            credito: linhas.credito,
            municipio: linhas.municipio,
            uf: linhas.uf,
            cep: linhas.cep,
            data: dtconvertida,
            fonte: linhas.fonte,
            potencia: numpotencia,
            modulos: linhas.modulos,
            inversores: linhas.inversores,
            arranjo:numponto
    }

    pool.getConnection(function(err, connection){
        if(err) throw err;

        connection.query('INSERT INTO geracao_distribuida set ?', dados, function(error, result, fields){
            console.log(dados);
            connection.release();

            if(error) throw error;
        });
    });
}

fs.createReadStream('./dados-annel.csv')
.pipe(csv())
.on('data', (row)=>{
    gravando(row)
})
.on('end', ()=>{
    console.log('Finalizado a leitura do arquivo!')
})