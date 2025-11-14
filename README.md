# Atividade4 
Respostas das perguntas: 

1-
É importante instalar `expo-notifications` para gerenciar notificações e `expo-device` para acessar informações do dispositivo, como permissões e tipo de hardware, essenciais para o funcionamento correto das notificações.

2-
O Clerk simplifica a autenticação, oferecendo segurança, integração com provedores (como Google) e gerenciamento de sessões sem necessidade de implementação manual, reduzindo erros e tempo de desenvolvimento.

3-
Se o usuário negar a permissão, o app não poderá exibir notificações, comprometendo sua funcionalidade principal de lembrete de hidratação.

4-
A notificação ainda será exibida, pois o agendamento é gerenciado pelo sistema operacional, independente do estado do app.

5-
Notificação agendada é exibida uma vez; a recorrente repete em intervalos definidos, como a cada hora, conforme o parâmetro `repeats: true`.

6-
Remover o listener evita vazamentos de memória e comportamentos inesperados, como atualizações de estado em componentes desmontados.

7-
Exibir o histórico aumenta a transparência e engajamento, permitindo que o usuário acompanhe seus lembretes e interações com o app.

8-
Personalizar notificações (som, ícone) torna a experiência mais agradável e distintiva, melhorando a identificação e atenção do usuário.

9-
A notificação será exibida visualmente, mas o som não será reproduzido se o dispositivo estiver no modo silencioso.

10-
Esses conceitos podem ser aplicados em projetos com autenticação segura e notificações para lembrete de tarefas, eventos ou interações em tempo real.
