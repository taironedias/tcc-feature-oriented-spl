#### Feature alternativa:
Para a feature alternativa presente no feature model, temos que setar o caminho da página de cada acesso na variável access:

- Caso o acesso seja pela chave do exame: AccessWithKeyService
- Caso o acesso seja por usuário e senha: AccessWithLoginService

Lembrando que para essas variáveis existe um xor, ou seja, apenas uma delas deve ser true.

#### Feature opcional:
Para a feature opcional presente no feature model, temos que setar como true ou false a variável "level".