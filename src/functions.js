
function sendEmail(desc, acao) {

  const serviceId = "service_b9lcyl2"
  const templateId = "template_x2pnn3d"

  let message = `Tarefa ${desc} ${acao}`

  
  let emailContent = {
          to_name: "Bot",
          from_name: "Davi",
          message: message
      }

      emailjs.send(serviceId, templateId, emailContent).
          then(function (response) {
              console.log("Email enviado com sucesso!", response.status, response.text);
              alert("Email enviado com sucesso!")
          }, function (error) {
              console.log("Erro ao enviar o email:", error);
          });
  
}

function filterTable() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const table = document.getElementById("tabelaTarefas");
  const rows = table.getElementsByTagName("tr");

  let encontrou = false;

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let match = false;

    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].innerText.toLowerCase();

      if (cellText.includes(input)) {
        match = true;
        break;
      }
    }

    if (match) {
      rows[i].style.display = "";
      encontrou = true;
    } else {
      rows[i].style.display = "none";
    }
  }

  if (!encontrou && input !== "") {
    alert("Nenhuma tarefa encontrada com esse valor.");
  }
}


async function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  const linhas = Array.from(document.querySelectorAll("tr"));
  console.log(linhas);

  if (linhas.length === 0) {
    alert("Nenhuma tarefa para exportar.");
    return;
  }

  // Filtra as linhas que contêm dados (ignorando as linhas com botões ou células vazias)
  const linhasComDados = linhas.filter(linha => {
    const colunas = linha.querySelectorAll("td");
    // Verifica se a linha contém pelo menos uma célula com texto válido, ignorando botões
    return Array.from(colunas).some(coluna => coluna.textContent.trim() !== "" && !coluna.querySelector("button"));
  });

  if (linhasComDados.length === 0) {
    alert("Nenhuma tarefa para exportar.");
    return;
  }

  linhasComDados.forEach((linha, index) => {
    const colunas = linha.querySelectorAll("td");
    const campos = [
      "ID",
      "Descrição",
      "Data Criação",
      "Data Prevista",
      "Data Encerramento",
      "Situação"
    ];

     y += 8;

    colunas.forEach((coluna, i) => {
      
      if (!coluna.querySelector("button")) {
        doc.text(`${campos[i]}: ${coluna.textContent}`, 10, y);
        y += 8;
      }
    });

    y += 5; 
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("tarefas.pdf");
}


  async function carregarTarefas() {
  try {
    const resposta = await fetch("http://150.136.168.160:3001/tarefas");
    const tarefas = await resposta.json();
    const tbody = document.querySelector("#tabelaTarefas tbody");
    tbody.innerHTML = ""; // limpa tabela atual

    console.log(tarefas)

    tarefas.forEach(tarefa => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
<td>${tarefa.id}</td>
<td>${tarefa.descricao}</td>
<td>${formatarData(tarefa.data_criacao)}</td>
<td>${formatarData(tarefa.data_prevista)}</td>
<td>${tarefa.data_encerramento ? formatarData(tarefa.data_encerramento) : "-"}</td>
<td>${tarefa.situacao}</td>
<td>
  <button onclick="editarTarefa(${tarefa.id})" style="margin-right: 5px;">Editar</button>
  <button onclick="excluirTarefa(${tarefa.id})">Remover</button>
</td>
`;

console.log("aaa")
console.log(tarefa.data_encerramento)
      tbody.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar tarefas:", erro);
  }
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

// Carrega tarefas ao abrir a página
window.onload = carregarTarefas;



//excluir
async function excluirTarefa(id) {
const confirmar = confirm(`Tem certeza que deseja excluir a tarefa ${id}?`);
if (!confirmar) return;

try {
  const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
    method: 'DELETE'
  });

  console.log(resposta)

  if (!resposta.ok) {
    const erro = await resposta.json();
    alert(`Erro: ${erro.erro}`);
    return;
  }

  alert('Tarefa excluída com sucesso!');
  carregarTarefas(); // atualiza tabela
} catch (erro) {
  console.error("Erro ao excluir:", erro);
  alert('Erro ao excluir a tarefa.');
}
}



///criacao
async function adicionarTarefa(event) {
event.preventDefault();

const descricao = document.getElementById("descricao").value;
const dataInput = document.getElementById("dataPrevista").value;
const situacao = document.getElementById("situacao").value;

// Adiciona hora para se adequar ao tipo DATETIME do MySQL
const data_prevista = `${dataInput} 00:00:00`;

const resposta = await fetch('http://localhost:3000/tarefas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    descricao,
    data_prevista,
    situacao
  })
});

if (resposta.ok) {
  alert('Tarefa cadastrada com sucesso!');
  document.getElementById("formTarefa").reset();
  carregarTarefas(); // Atualiza a tabela
  
} else {
  const erro = await resposta.json();
  alert(`Erro ao cadastrar: ${erro.erro}`);
}
}


//edicao

let tarefaAtualId = null;  // Variável para armazenar a tarefa que está sendo editada

async function editarTarefa(id) {
console.log(id);
document.getElementById("form-edicao").style.display = "block";

tarefaAtualId = id;
console.log("a" + tarefaAtualId)

try {
  const tarefa = await obterTarefaPorId(id);
  console.log("bbbb")
  console.log(tarefa);

  document.getElementById("descricao-edicao").value = tarefa.descricao;
  document.getElementById("data-prevista-edicao").value = tarefa.data_prevista.split('T')[0];
  document.getElementById("situacao-edicao").value = tarefa.situacao;
} catch (erro) {
  alert('Erro ao carregar dados para edição.');
}
}
// Função fictícia para buscar a tarefa por id
async function obterTarefaPorId(id) {
  try {
    console.log("ID da tarefa no fetch:", id);

    const resposta = await fetch(`http://localhost:3000/tarefas/${id}`);
    console.log(resposta)

    if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}: xxxxxxxxx Tarefa não encontrada`);
  }

    const tarefa = await resposta.json();
    console.log("t: " + tarefa)
    console.log("aaa")
    return tarefa;
  } catch (erro) {
    console.error('Erro ao buscar tarefa para edição', erro);
    throw erro;
  }
}

// Função para salvar a edição
async function salvarEdicao() {
  const descricao = document.getElementById("descricao-edicao").value;
  const dataPrevista = document.getElementById("data-prevista-edicao").value;
  const situacao = document.getElementById("situacao-edicao").value;

  const resposta = await fetch(`http://localhost:3000/tarefas/${tarefaAtualId}`, {
    method: 'PUT',  // Usamos PUT para edição
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, data_prevista: dataPrevista, situacao })
  });

  if (resposta.ok) {
    alert('Tarefa editada com sucesso!');
    carregarTarefas();  // Atualiza a tabela
    cancelarEdicao();  // Fecha o formulário de edição
  } else {
    const erro = await resposta.json();
    alert(`Erro ao editar tarefa: ${erro.erro}`);
  }
}

// Função para cancelar a edição
function cancelarEdicao() {
  document.getElementById("form-edicao").style.display = "none";  // Esconde o formulário de edição
}

