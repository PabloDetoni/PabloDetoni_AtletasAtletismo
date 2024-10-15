//Esta incorreto

let listaAtletas = []; // conjunto de dados
let oQueEstaFazendo = ''; // variável global de controle
let atleta = null; // variável global

window.onload = inserirDadosIniciais();

// Método para mostrar mensagem quando o foco for para o ID
document.getElementById("inputId").addEventListener("focus", function () {
    mostrarAviso("Digite o ID e clique no botão Procure");
});

// Backend (não interage com o HTML)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAtletas.length; i++) {
        const atleta = listaAtletas[i];
        if (atleta.id == chave) {
            atleta.posicaoNaLista = i; // guarda a posição na lista (índice)
            return listaAtletas[i]; // devolve a linha inteira
        }
    }
    return null; // não achou
}

// Função para procurar um elemento pela chave primária
function procure() {
    const id = document.getElementById("inputId").value;
    if (id) { // se digitou um ID
        atleta = procurePorChavePrimaria(id);
        if (atleta) { // achou na lista
            mostrarDadosAtleta(atleta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { // não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else { // se deixou o ID em branco e tentou procurar
        document.getElementById("inputId").focus();
        return;
    }
}

// Backend -> Frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); // visibilidade dos botões
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão Salvar");
    document.getElementById("inputId").focus();
}

// Função para alterar um elemento da lista
function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique no botão Salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(true);
    document.getElementById("inputId").readOnly = true; // bloqueia a chave
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clique no botão Salvar para confirmar a exclusão");
}

function salvar() {
    const id = document.getElementById("inputId").value;
    const nome = document.getElementById("inputNome").value;
    const data = document.getElementById("inputData").value;
    const modalidade = document.getElementById("inputModalidade").value;
    const genero = document.getElementById("inputGenero").value;
    const competicoes = parseInt(document.getElementById("inputCompeticoes").value);
    const medalhas = parseInt(document.getElementById("inputMedalha").value);

    // Verificar se os dados estão corretos
    if (id && nome && data && !isNaN(competicoes) && !isNaN(medalhas)) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                atleta = new Atleta(id, nome, data, modalidade, genero, competicoes, medalhas);
                listaAtletas.push(atleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                let atletaAlterado = new Atleta(id, nome, data, modalidade, genero, competicoes, medalhas);
                listaAtletas[atleta.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                listaAtletas.splice(atleta.posicaoNaLista, 1);
                mostrarAviso("EXCLUÍDO");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

// Backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto += linha.id + " - " +
            linha.nome + " - " +
            linha.data + " - " +
            linha.modalidade + " - " +
            linha.genero + " - " +
            linha.competicoes + " - " +
            linha.medalhas + "<br>";
    }
    return texto;
}

// Backend -> Frontend (interage com HTML)
function listar() {
    document.getElementById("resp").innerHTML = preparaListagem(listaAtletas);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    document.getElementById("resp").innerHTML = mensagem;
}

// Função para mostrar os dados do atleta nos campos
function mostrarDadosAtleta(atleta) {
    document.getElementById("inputNome").value = atleta.nome;
    document.getElementById("inputData").value = atleta.data;
    document.getElementById("inputModalidade").value = atleta.modalidade;
    document.getElementById("inputGenero").value = atleta.genero;
    document.getElementById("inputCompeticoes").value = atleta.competicoes;
    document.getElementById("inputMedalha").value = atleta.medalhas;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputModalidade").value = "inputCV";
    document.getElementById("inputGenero").value = "fem";
    document.getElementById("inputCompeticoes").value = "";
    document.getElementById("inputMedalha").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura; // chave
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputData").readOnly = soLeitura;
    document.getElementById("inputModalidade").disabled = !soLeitura;
    document.getElementById("inputGenero").disabled = !soLeitura;
    document.getElementById("inputCompeticoes").readOnly = soLeitura;
    document.getElementById("inputMedalha").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}

// Backend
function inserirDadosIniciais() {
    listaAtletas = []; // se houver dados na lista, apaga todos
    let atleta = new Atleta('1', 'Atleta 1', '2000-01-01', 'Corrida de Velocidade', 'fem', 5, 2);
    listaAtletas.push(atleta);
    atleta = new Atleta('2', 'Atleta 2', '1998-02-15', 'Arremesso', 'male', 3, 1);
    listaAtletas.push(atleta);
    atleta = new Atleta('3', 'Atleta 3', '2001-03-10', 'Salto', 'fem', 8, 3);
    listaAtletas.push(atleta);
    listar();
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    bloquearAtributos(true);
}
