# Fire Emblem Fortune's Weave - Database

Um database em português para auxiliar sua gameplay em Fire Emblem Fortune's Weave.

## Objetivo

O principal objetivo deste projeto é ser um guia para os jogadores terem uma experiência melhor no jogo e ajudá-los a planejar suas rotas.

## O que já existe

- **Início:** página inicial com uma visão geral do site.
- **Personagens:** todos os personagens, com suas habilidades pessoais e as habilidades únicas, base e "+" juntas (nomes originais em inglês, descrições em português).
- **Classes:** um sub-menu por tier (Base, Beginner, Specialty, Advanced, Master, Divine), com uma caixa por classe (movimento, proficiências, crescimento, Class Abilities e Master Ability com descrições em português) e busca por nome.
- **Recrutamento:** uma tabela mostrando como recrutar cada personagem em cada rota.
- **Simulador:** dois submenus. **Taxa de Crescimento:** escolha um personagem e uma classe (separadas por tier) e veja o crescimento final (base do personagem + modificador da classe). **Build:** escolha um personagem, o nível de entrada (padrão 1) e o nível a simular (até 99) e veja os atributos usando a fórmula de autolevel; a classe Beginner vale a partir do nível 5, Specialty a partir do 20, Advanced a partir do 35 e Master a partir do 45. A fórmula de autolevel vale só até o nível de entrada; depois dele usa-se o crescimento médio (taxa ÷ 100 por nível, com o resultado arredondado: 0,5 ou mais sobe). Cada classe escolhida também soma seus bônus fixos de atributo (dados de um gráfico da comunidade no Reddit, conferidos com uma planilha própria) ao atingir a faixa de nível; os bônus se acumulam. Beginner e Specialty já vêm preenchidas com as da tabela de cada personagem, mas podem ser trocadas. No fim da página há a janela de **Habilidades**: Habilidade Pessoal (até o nível 34; a partir do 35, a Habilidade Única), Habilidades de Classe (só a da classe do último tier atingido, sem acumular) e até 5 habilidades equipáveis (Skill por rank e Class Mastery, todas selecionáveis). As habilidades equipáveis vêm da [Fire Emblem Wiki](https://fireemblemwiki.org/wiki/List_of_abilities_in_Fire_Emblem:_Fortune%27s_Weave) (CC BY-SA), lidas por `npm run data`.
- **Crescimento:** sub-menus *Unidades* (taxas de crescimento em % de cada personagem) e *Classes* (modificadores de crescimento de cada classe, incluindo as faixas por nível), ambos com busca por nome, *Montarias* (bônus de status, crescimento, habilidades e local de cada montaria) e *Batalhões* (categoria, rank, limite de reunião, habilidade, bônus de status e local, com busca por nome).
- **Paralogues:** uma tabela com as datas em que cada paralogue fica disponível em cada rota (mês/dia do calendário do jogo).
- **Magias:** *White Magic Spells* e *Black Magic Spells* , com as magias que cada personagem aprende por rank (D–S), busca por personagem e uma tabela com a descrição completa de cada magia.
- **Artes de Combate:** sub-menus *Sword*, *Lance*, *Axe*, *Bow*, *Brawl*, *Authority*, *Infantry*, *Riding*, *Armor* e *Flying*, com o que cada personagem aprende por rank, busca por personagem e, nas cinco armas, uma tabela com a descrição completa de cada arte de combate. As tabelas de descrição de Authority, Infantry, Riding, Armor e Flying ainda serão adicionadas.

Gostou do projeto? Siga o canal no YouTube: https://www.youtube.com/@velhotejogador

O site está disponível em: https://fefwdb.velhoblog.online/

## Como contribuir

Quer ajudar? Veja o guia em [CONTRIBUTING.md](CONTRIBUTING.md) (português e inglês).

## Segurança

Encontrou uma vulnerabilidade? Veja [SECURITY.md](SECURITY.md) para saber como reportar.

## Para desenvolvedores

Detalhes técnicos em [TECH_STACK.md](TECH_STACK.md).

## Créditos

Dados e imagens baseados no [Fortune Weaver](https://fefw-planner-server.vercel.app).

## Aviso

Este é um projeto de fãs, não oficial, e não é afiliado, patrocinado ou endossado pelos criadores de Fire Emblem: Fortune's Weave nem pelos detentores dos direitos da série Fire Emblem. Nomes, personagens, imagens e demais materiais do jogo pertencem aos seus respectivos donos.

## Licença

O código deste repositório está sob a [Licença MIT](LICENSE). A licença cobre apenas o código e os textos escritos para este projeto; ela não se aplica às imagens, nomes e dados do jogo.
