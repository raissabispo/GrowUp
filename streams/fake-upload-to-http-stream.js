import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}
fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half', // Necessário para usar streams como corpo
  })
    .then(response => response.text()) // Processa a resposta como texto
    .then(data => {
      console.log(data); // Exibe o conteúdo retornado pelo servidor
    })
    .catch(err => console.error('Erro:', err)); // Captura e exibe erros