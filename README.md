
#  zxcvbn-custom

##  O que é zxcvbn

O zxcvbn é um estimador de força de senhas baseado em listas de palavras usadas por crackers. Ele utiliza correspondência de padrões e uma estimativa conservadora para reconhecer e avaliar cerca de 30.000 senhas comuns, nomes e apelidos baseados em dados do censo dos EUA, palavras populares em inglês da Wikipedia, televisão e filmes dos EUA, e outros padrões comuns como datas, repetições (aaa), sequências (abcd), padrões de teclado (qwertyuiop) e l33t speak.

A utilização da biblioteca zxcvbn é uma alternativa algorítmica para políticas de senhas em aplicações modernas, sendo segura e flexível. Ela atribui uma pontuação de 0 a 4, onde 0 indica uma senha muito fraca, de acordo com o cálculo de entropia e semântica, e 4 indica uma senha forte.

**Segurança:** As políticas de senhas frequentemente falham de duas maneiras: permitem senhas fracas (como P@ssword1) e não permitem senhas fortes.

**Flexibilidade:** O zxcvbn permite uma ampla variedade de estilos de senhas, desde que detecte complexidade suficiente. Senhas compostas por frases são altamente classificadas se contiverem palavras incomuns, padrões de teclado são avaliados com base no comprimento e na complexidade dos padrões, e a capitalização adiciona mais complexidade quando não é previsível.

**Usabilidade:** O zxcvbn foi projetado para fornecer feedback instantâneo em interfaces simples e sem regras rigorosas. Além da estimativa de força, o zxcvbn inclui feedback verbal mínimo e direcionado, ajudando os usuários a criar senhas mais difíceis de adivinhar.

**Desvantagem:** Conforme descrito no inicio deste documento, a biblioteca tem como objetivo senhas e padrões americanos, o que nos obriga a criar **wordlists** voltados para o cenário brasileiro 

## Como instalar

Para instalar a aplicação use os seguintes comandos:

```bash
git clone https://github.com/0xGabe/zxcvbn-custom
```

Com o código da aplicação é necessário instalar as seguintes dependências com o NPM:

```bash
npm install express zxcvbn
```

##  Aplicação Teste

A aplicação desenvolvida tem o objetivo de ilustrar como podemos usar qualquer palavra para validação seguindo os padrões da biblioteca **zxcvbn**

Neste exemplo, o arquivo **wordlist.json** armazena a seguinte lista de palavras:

```json
[
	"senha123",
	"minhasenhasupersecreta",
	"outrasenhas",
	"Mudar@123",
	"123@Mudar",
	"Alterar@123",
	"123@Alterar"
]
```
As senhas que se encaixarem no padrão da *wordlist* serão consideras com força 0, isso acontece devido a baixa semântica.

A função **checkPassword** dentro do arquivo  **app.js** recebe a senha inserida pelo usuário e efetua a validação com a biblioteca zxcvbn + a *wodlist* contendo as senhas fracas.

O trecho de codigo mencionado:

```js
// Personalizar a função zxcvbn para incluir a lista personalizada
function  checkPassword(password)  {
	// Adiciona palavras personalizadas à lista interna do zxcvbn
	const  result  =  zxcvbn(password,  customWordlist);
	return  result;
}
```

## Demonstração

A imagem a seguir simula um usuário entrando com uma senha semanticamente fraca que a biblioteca por padrão não realiza o filtro:

![](/img/semantica-fraca.png)

Observe que a aplicação retornou que a senha se enquadra na força 3 dentre os parâmetros definidos pela lib, entretanto atacantes comumente realizam ataques conhecidos como **password spray** utilizando o padrão mencionado.

Ao adicionar **Empresa@2024** a nossa *wordlist* definida pelo arquivo JSON e realizar a mesma consulta temos o seguinte resultado:

![](/img/validacao-semantica.png)

Note que a força da senha foi retornada para 0, diante disso, se torna possível realizar a validação semântica da senha inserida pelo usuário em conjunto com a lib *zxcvbn*