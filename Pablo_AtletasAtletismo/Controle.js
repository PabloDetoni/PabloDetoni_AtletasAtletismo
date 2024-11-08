let listaDeAtletas = []; // conjunto de dados
let oQueEstaFazendo = ''; // variável global de controle
let atleta = null; // variável global 

window.onload = inserirDadosIniciais();

bloquearAtributos(true);

// Função para procurar um atleta pela chave primária
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaDeAtletas.length; i++) {
        const atleta = listaDeAtletas[i];
        if (atleta.id == chave) {
            atleta.posicaoNaLista = i;
            return atleta;
        }
    }
    return null; // não achou
}

// Função para procurar um atleta
function procure() {
    const id = document.getElementById("inputId").value;
    if (id) {
        atleta = procurePorChavePrimaria(id);
        if (atleta) {
            mostrarDadosAtleta(atleta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else {
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
    }
}

// Função para inserir um atleta
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique o botão salvar");
    document.getElementById("inputId").focus();
}

// Função para alterar um atleta
function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique o botão salvar");
}

// Função para excluir um atleta
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clique o botão salvar para confirmar a exclusão");
}

// Função para salvar (inserir, alterar ou excluir)
function salvar() {
    const id = document.getElementById("inputId").value;
    let nome = document.getElementById("inputNome").value;
    let genero = document.getElementById("inputGenero").value;
    let data = document.getElementById("inputData").value;
    let modalidade = document.getElementById("inputModalidade").value;
    let competicoes = parseInt(document.getElementById("inputCompeticoes").value);
    let medalhas = parseInt(document.getElementById("inputMedalha").value);

    if (id && nome && data && !isNaN(medalhas) && modalidade && genero && !isNaN(competicoes)) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                atleta = new Atleta(id, nome, genero, data, modalidade, medalhas, competicoes);
                listaDeAtletas.push(atleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                atletaAlterado = new Atleta(id, nome, genero, data, modalidade, medalhas, competicoes);
                listaDeAtletas[atleta.posicaoNaLista] = atletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaDeAtletas.length; i++) {
                    if (atleta.posicaoNaLista != i)
                        novaLista.push(listaDeAtletas[i])

                }
                break
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
    }
}

// Função para preparar a listagem
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " - " +
            linha.genero + " - " +
            linha.data + " - " +
            linha.modalidade + " - " +
            linha.competicoes + " - " +
            linha.medalhas + "<br>";
    }
    return texto;
}

// Função para listar atletas
function listar() {
    document.getElementById("divResp").innerHTML = preparaListagem(listaDeAtletas);
}

// Função para cancelar a operação
function cancelar() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

// Função para mostrar aviso
function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar dados do atleta nos campos
function mostrarDadosAtleta(atleta) {
    document.getElementById("inputId").value = atleta.id;
    document.getElementById("inputNome").value = atleta.nome;
    document.getElementById("inputData").value = atleta.data;
    document.getElementById("inputModalidade").value = atleta.modalidade;
    document.getElementById("inputGenero").value = atleta.genero;
    document.getElementById("inputMedalha").value = atleta.medalhas;
    document.getElementById("inputCompeticoes").value = atleta.competicoes;
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputModalidade").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputMedalha").value = "";
    document.getElementById("inputCompeticoes").value = "";
    bloquearAtributos(true);
}

// Função para bloquear atributos
function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputData").readOnly = soLeitura;
    document.getElementById("inputModalidade").readOnly = soLeitura;
    document.getElementById("inputGenero").readOnly = soLeitura;
    document.getElementById("inputMedalha").readOnly = soLeitura;
    document.getElementById("inputCompeticoes").readOnly = soLeitura;
}

// Função para mostrar/hide botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}

// Função para inserir dados iniciais
function inserirDadosIniciais() {
    listaDeAtletas = []; // limpa a lista

    let atleta = new Atleta('111', 'Ana Silva', "Feminino", "1111-01-01", "Corrida de Velocidade", 10, 6);
    listaDeAtletas.push(atleta);
    atleta = new Atleta('222', 'Bruno Costa', "Masculino", "1111-01-01", "Corrida de Resistencia", 7, 3);
    listaDeAtletas.push(atleta);
    atleta = new Atleta('333', 'Carla Oliveira', "Feminino", "1111-01-01", "Corrida de Velocidade", 4, 1);
    listaDeAtletas.push(atleta);
    atleta = new Atleta('444', 'Daniel Souza', "Masculino", "1111-01-01", "Corrida de Resistencia", 3, 0);
    listaDeAtletas.push(atleta);
    atleta = new Atleta('555', 'Eduardo Lima', "Masculino", "1111-01-01", "Lançamento ou Arremesso", 6, 2);
    listaDeAtletas.push(atleta);
    atleta = new Atleta('666', 'Bruno Costa', "Masculino", "1111-01-01", "Lançamento ou Arremesso", 8, 7);
    listaDeAtletas.push(atleta);
    atleta = new Atleta('777', 'João Lucas', "Masculino", "1111-01-01", "Salto", 16, 14);
    listaDeAtletas.push(atleta);
    listar();
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    bloquearAtributos(true);
}

