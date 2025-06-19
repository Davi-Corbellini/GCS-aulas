const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'davi.corbellini@gmail.com',
    pass: 'esxp isug syev rjrq'
  }
});

async function enviarEmail(tarefa, acao) {
  const mailOptions = {
    from: '"Sistema de Tarefas" <davi.corbellini@gmail.com>',
    to: 'davi.corbellini@gmail.com',
    subject: `Tarefa ${acao}`,
    text: `A tarefa "${tarefa}" foi ${acao}.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ', info.response);
  } catch (erro) {
    console.error('Erro ao enviar email:', erro);
  }
}

module.exports = enviarEmail;
