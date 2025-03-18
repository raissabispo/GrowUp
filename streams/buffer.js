// Representação do espaço na memória do computador(transição de dados)
// Buffer é uma classe que representa um array de bytes

const buf = Buffer.from('opa')
console.log(buf.toJSON())
/* <Buffer 6f 70 61> */
// { type: 'Buffer', data: [ 111, 112, 97 ] }