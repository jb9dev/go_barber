# Recuperação de senha

**Requisitos funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve poder receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos não funcionais (ferramentas e decisões técnicas)**

- Utilizar o Mailtrap para testar envios de e-mail em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios de e-mail em produção;
- O envio de e-mails de acontecer em segundo plano (utilizando filas);

**Regras de negócio**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetá-la;

# Atualização do perfil

**Requisitos funcionais**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**Regras de negócio**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a senha nova;

# Painel do prestador

**Requisitos funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos não funcionais (ferramentas e decisões técnicas)**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador deve ser armazenadas no MongoDB;
- As notificações do prestador deve ser enviadas em tempo real utilizando o Socket.io;

**Regras de negócio**

- A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar;

# Agendamento de serviços

**Requisitos funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com o prestador;

**Requisitos não funcionais (ferramentas e decisões técnicas)**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h e 18h, sendo que o último horário disponível será às 17h;
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
