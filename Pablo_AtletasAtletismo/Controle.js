let listaDeAtletas = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let atleta = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaDeAtletas.length; i++) {
        const atleta = listaDeAtletas[i];
        if (atleta.id == chave) {
            atleta.posicaoNaLista = i;
            return listaDeAtletas[i];
        }
    }
    return null;//não achou
}

function descobrirIdade() {
    const data = document.getElementById("inputData").value;
    data = new Date(data).getFullYear()
    let idade = 2024 - data
    return idade
}

function categorizar(idade) {
    let categ;

    if (idade === 12 || idade === 13) {
        categ = "Categoria Sub-14";
    } else if (idade === 14 || idade === 15) {
        categ = "Categoria Sub-16";
    } else if (idade === 16 || idade === 17) {
        categ = "Categoria Sub-18";
    } else if (idade >= 16 && idade <= 19) {
        categ = "Categoria Sub-20";
    } else if (idade >= 16 && idade <= 22) {
        categ = "Categoria Sub-23";
    } else if (idade >= 16) {
        categ = "Categoria de Adultos";
    } else if (idade >= 40) {
        categ = "Categoria de Masters";
    } else {
        categ = "Idade fora das categorias estabelecidas";
    }

    return categ
}

function descobrirGenero() {
    let g = document.getElementById("inputGenero").value;
    if (g === "fem") {
        genero = "Feminino"
    } else {
        genero = "Masculino"
    }
    return genero
}

function descobrirModalidade() {
    let M = document.getElementById("inputModalidade").value;
    if (M === "inputCV") {
        modalidade = "Corrida de Velocidade"
    } else if (M === "inputCR") {
        modalidade = "Corrida de Resistencia"
    } else if (M === "inputLA") {
        modalidade = "Lançamento ou Arremesso"
    } else {
        modalidade = "Salto"
    }
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (id) { // se digitou um id
        atleta = procurePorChavePrimaria(id);
        if (atleta) { //achou na lista
            mostrarDadosAtleta(atleta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique o botão salvar");
    document.getElementById("inputId").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clique o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let id;
    if (atleta == null) {
        id = document.getElementById("inputId").value;
    } else {
        id = atleta.id;
    }

    const nome = document.getElementById("inputNome").value;
    const data = document.getElementById("inputData").value;
    const modalidade = document.getElementById("inputModalidade").value;
    const genero = document.getElementById("inputGenero").value
    const competicoes = parseInt(document.getElementById("inputCompeticoes").value);
    const medalhas = parseInt(document.getElementById("inputMedalhas").value);

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nome && data && medalhas && modalidade && genero && competicoes) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                atleta = new atleta(id, nome, data, medalhas, modalidade, genero, competicoes);
                listaDeAtletas.push(atleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                atletaAlterado = new atleta(id, nome, data, medalhas, modalidade, genero, competicoes);
                listaDeAtletas[atleta.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaDeAtletas.length; i++) {
                    if (atleta.posicaoNaLista != i) {
                        novaLista.push(listaDeAtletas[i]);
                    }
                }
                listaDeAtletas = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
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

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " - " +
            linha.data + " - " +
            linha.medalhas + " - " +
            linha.modalidade + " - " +
            linha.genero + " - " +
            linha.competicoes + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("divResp").innerHTML = preparaListagem(listaDeAtletas);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do atleta nos campos
function mostrarDadosAtleta(atleta) {
    document.getElementById("inputId").value = atleta.id;
    document.getElementById("inputNome").value = atleta.nome;
    document.getElementById("inputData").value = atleta.data;
    document.getElementById("inputModalidade").value = atleta.modalidade;
    document.getElementById("inputGenero").value = atleta.genero;
    document.getElementById("inputMedalhas").value = atleta.medalhas;
    document.getElementById("inputCompeticoes").value = atleta.competicoes;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputModalidade").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputMedalhas").value = "";
    document.getElementById("inputCompeticoes").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputData").readOnly = soLeitura;
    document.getElementById("inputModalidade").readOnly = soLeitura;
    document.getElementById("inputGenero").readOnly = soLeitura;
    document.getElementById("inputMedalhas").readOnly = soLeitura;
    document.getElementById("inputCompeticoes").readOnly = soLeitura;

}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}
