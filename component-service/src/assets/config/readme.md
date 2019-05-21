Existem dois valores que podem ser passados como atributo da variável access:

- Caso queria que o sistema tenha usuário e senha, deve-se colocar como atributo:
    login-studant
- Caso queria que o sistema tenha acesso pela chave gerada pelo exame, deve-se colocar como atributo:
    access-key

Isso é importante, pois o sistema passa a ser modularizado. Então, cada forma de acesso terá a sua própria *.module.ts, *.page.html, *.page.scss, *.page.spec.ts, *.page.ts

Quanto ao level:
Basta colocar true ou false