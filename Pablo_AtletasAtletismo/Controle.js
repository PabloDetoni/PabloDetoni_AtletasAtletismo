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
    let data = document.getElementById("inputData").value;
    let modalidade = document.getElementById("inputModalidade").value;
    let genero = document.getElementById("inputGenero").value;
    let competicoes = parseInt(document.getElementById("inputCompeticoes").value);
    let medalhas = parseInt(document.getElementById("inputMedalha").value);

    if (id && nome && data && modalidade && genero && !isNaN(competicoes) && !isNaN(medalhas)) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                atleta = new Atleta(id, nome, data, modalidade, genero, competicoes, medalhas);
                listaDeAtletas.push(atleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                atletaAlterado = new Atleta(id, nome, data, modalidade, genero, competicoes, medalhas);
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
            "Id: " + linha.id + " - " +
            "Nome: " + linha.nome + " - " +
            "Data de Nascimento: " +   linha.data + " - " +
            "Modalidade: " + linha.modalidade + " - " +
            "Genero: " +  linha.genero + " - " +
            "Competicoes Em que Participou: " +   linha.competicoes + " - " +
            "Medalhas Ganhas: " +   linha.medalhas + "<br>";
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
    document.getElementById("inputCompeticoes").value = atleta.competicoes;
    document.getElementById("inputMedalha").value = atleta.medalhas;

    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputData").value = "";
    document.getElementById("inputModalidade").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputCompeticoes").value = "";
    document.getElementById("inputMedalha").value = "";
    bloquearAtributos(true);
}

// Função para bloquear atributos
function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputData").readOnly = soLeitura;
    document.getElementById("inputModalidade").readOnly = soLeitura;
    document.getElementById("inputGenero").readOnly = soLeitura;
    document.getElementById("inputCompeticoes").readOnly = soLeitura;
    document.getElementById("inputMedalha").readOnly = soLeitura;
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


function salvarNoComputador() {
    nomeParaSalvar = "./Atleta.csv";
    let textoCSV = "";
    for (let i = 0; i < listaDeAtletas.length; i++) {
        const linha = listaDeAtletas[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.data + ";" +
            linha.modalidade + ";" +
            linha.genero + ";" +
            linha.competicoes + ";" +
            linha.medalhas + "\n";
    }

    salvarEmArquivo(nomeParaSalvar, textoCSV);
}
function salvarEmArquivo(nomeArq, conteudo) {
    // Cria um blob com o conteúdo em formato de texto
    const blob = new Blob([conteudo], { type: 'text/plain' });
    // Cria um link temporário para o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq; // Nome do arquivo de download
    // Simula o clique no link para iniciar o download
    link.click();
    // Libera o objeto URL
    URL.revokeObjectURL(link.href);
}


// Função para abrir o seletor de arquivos para upload
function buscarDadosSalvosNoComputador() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV
    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            processarArquivo(arquivo);
        }
    };
    input.click(); // Simula o clique para abrir o seletor de arquivos

}

// Função para processar o arquivo CSV e transferir os dados para a listaMusica
function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaDeAtletas = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 7) {
                    // Adiciona os dados à listaMusica como um objeto
                    listaDeAtletas.push({
                        id: dados[0],
                        nome: dados[1],
                        data: dados[2],
                        modalidade: dados[3],
                        genero: dados[4],
                        competicoes: dados[5],
                        medalhas: dados[6]
                    });
                }
            }
        }
        // console.log("Upload concluído!", listaMusica); // Exibe no console a lista atualizada
        listar();
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}

// Função para inserir dados iniciais
function inserirDadosIniciais() {
    listaDeAtletas = []; // limpa a lista
    let atleta;
    atleta = new Atleta('111', 'Ana Silva', "2024-01-01", "Corrida de Velocidade", "Feminino", 10, 6);
    listaDeAtletas.push(atleta);
    atleta = new Atleta ('222', 'Bruno Costa', "1111-01-01", "Corrida de Resistencia", "Masculino", 7, 3);
    listaDeAtletas.push(atleta);
    atleta = new Atleta ('333', 'Carla Oliveira', "1111-01-01", "Corrida de Velocidade", "Feminino", 4, 1);
    listaDeAtletas.push(atleta);
    atleta = new Atleta ('444', 'Daniel Souza', "1111-01-01", "Corrida de Resistencia", "Masculino", 3, 0);
    listaDeAtletas.push(atleta);
    atleta = new Atleta ('555', 'Eduardo Lima', "1111-01-01", "Lançamento ou Arremesso", "Masculino", 6, 2);
    listaDeAtletas.push(atleta);
    atleta = new Atleta ('666', 'Bruno Costa', "1111-01-01", "Lançamento ou Arremesso", "Masculino", 8, 7);
    listaDeAtletas.push(atleta);
    atleta = new Atleta ('777', 'João Lucas', "1111-01-01", "Salto", "Masculino", 16, 14);
    listaDeAtletas.push(atleta);
    listar();
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    bloquearAtributos(true);
}
