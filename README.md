# Inkluwatch
### Conversão de Estímulos Sonoros em Estímulos Táteis

Aplicativo que identifica sons específicos do ambiente e os transforma em padrões de vibração enviados a um smartwatch, promovendo acessibilidade, autonomia e inclusão para pessoas com deficiência auditiva.

## 📌 Informações Gerais

- **Nome do Projeto:** Inkluwatch
- **Equipe:** Artur de Assis, David Balmart, Fábio Rodrigues, Lucas Soares, Miguel Bernardo, Nickolas Bueno, Nicolas Rodrigues
- **Curso:** Técnico em Informática
- **Instituição:** FUNEC Riacho
- **Ano/Semestre:** 2026
- **Professor Orientador:** Rangel Rodrigues
- **Cliente/Setor Solicitante:** Projeto de acessibilidade e inclusão tecnológica.

## 🎯 Objetivo do Projeto

Desenvolver uma solução tecnológica acessível que transforme estímulos sonoros do ambiente em padrões de vibração específicos, permitindo que pessoas com deficiência auditiva identifiquem diferentes sons e alertas por meio de um sistema para smartwatch.

O projeto busca ampliar a autonomia, a segurança e a inclusão dessas pessoas, facilitando a percepção de acontecimentos sonoros no cotidiano e proporcionando maior independência em suas atividades diárias.

## 👥 Público-Alvo

- Pessoas com deficiência auditiva;
- Pessoas com perda parcial da audição;
- Pessoas que desejam receber alertas sonoros por meio de estímulos táteis;
- Instituições e ambientes que buscam soluções de acessibilidade.

## 🧩 Problema a Ser Resolvido

Pessoas com deficiência auditiva podem encontrar dificuldades para perceber determinados sons do ambiente, como campainhas, alarmes, sirenes e outros alertas sonoros.

A ausência dessas informações pode comprometer a percepção de acontecimentos importantes e limitar a autonomia em determinadas situações do cotidiano.

## 💡 Solução Proposta

O Inkluwatch propõe o desenvolvimento de um aplicativo integrado a um smartwatch, capaz de captar e identificar sons específicos do ambiente, convertendo-os em padrões distintos de vibração.

Cada categoria sonora será associada a um estímulo tátil próprio, permitindo que o usuário reconheça diferentes acontecimentos por meio do tato.

O aplicativo será desenvolvido inicialmente para Android, utilizando Flutter e Dart. O reconhecimento de áudio e a comunicação com o smartwatch serão implementados gradualmente.

## ⚙️ Funcionalidades do Sistema

### Funcionalidades Principais

- [ ] Captura de áudio por meio do microfone do celular;
- [ ] Identificação e classificação de sons específicos;
- [ ] Reconhecimento de campainhas, palmas, sirenes e outros estímulos;
- [ ] Associação de cada som a um padrão de vibração;
- [ ] Envio dos eventos identificados para o smartwatch;
- [ ] Reprodução de padrões táteis específicos no relógio;
- [ ] Personalização dos padrões de vibração;
- [ ] Configuração dos sons que o usuário deseja identificar.

### Funcionalidades do Protótipo Inicial

- [ ] Interface para testes de estímulos;
- [ ] Simulação de diferentes eventos sonoros;
- [ ] Implementação de padrões de vibração no celular;
- [ ] Separação da lógica de identificação de sons e execução das vibrações.

## 🛠️ Tecnologias Utilizadas

- **Linguagem principal:** Dart;
- **Framework:** Flutter;
- **Plataforma inicial:** Android;
- **Protótipo:** HTML, CSS, Javascript;
- **Reconhecimento de áudio:** Tecnologias de processamento e classificação de áudio a serem definidas;
- **Comunicação com smartwatch:** Bluetooth Low Energy (BLE), sujeito à compatibilidade do dispositivo;
- **IDE:** Visual Studio Code;
- **Ferramentas complementares:** Android Studio e Android SDK;
- **Versionamento:** Git e GitHub.

## 🗂️ Estrutura do Projeto

```
inkluwatch/
│
├── android/
│
├── lib/
│   ├── models/
│   │   └── sound_event.dart
│   │
│   ├── screens/
│   │   └── home_screen.dart
│   │
│   ├── services/
│   │   ├── audio_service.dart
│   │   └── vibration_service.dart
│   │
│   └── main.dart
│
├── test/
│
├── pubspec.yaml
└── README.md
```

## 🧪 Requisitos Funcionais

- **RF01** – O sistema deve permitir capturar sons por meio do microfone do dispositivo.
- **RF02** – O sistema deve identificar e classificar categorias de estímulos sonoros previamente definidas.
- **RF03** – O sistema deve associar cada categoria sonora a um padrão tátil específico.
- **RF04** – O sistema deve permitir testar os padrões de vibração.
- **RF05** – O sistema deve transmitir os eventos identificados para um smartwatch compatível.
- **RF06** – O smartwatch deve executar o padrão de vibração correspondente ao som identificado.
- **RF07** – O sistema deve permitir configurar os estímulos sonoros que serão reconhecidos.
- **RF08** – O sistema deve permitir personalizar os padrões de vibração.

## 🚫 Requisitos Não Funcionais

- **RNF01** – O aplicativo deve possuir uma interface simples, intuitiva e acessível.
- **RNF02** – O sistema deve apresentar baixo tempo de resposta entre a identificação do som e a execução do estímulo tátil.
- **RNF03** – O aplicativo deve buscar minimizar o consumo de bateria durante sua utilização.
- **RNF04** – A comunicação com o smartwatch deve ocorrer de maneira confiável.
- **RNF05** – O sistema deve respeitar a privacidade do usuário durante a captura e o processamento de áudio.
- **RNF06** – Os padrões de vibração devem ser suficientemente distintos para facilitar sua identificação pelo usuário.

## 📅 Cronograma do Projeto

| Etapa | Descrição | Responsável | Data |
|---|---|---|---|
| 1 | Levantamento de requisitos | Equipe | 
| 2 | Planejamento e modelagem | Equipe | 
| 3 | Configuração do ambiente e desenvolvimento inicial | Equipe | 
| 4 | Implementação da captura e classificação de áudio | Equipe | 
| 5 | Integração com smartwatch | Equipe |
| 6 | Testes e validação | Equipe | 
| 7 | Documentação e apresentação | Equipe |

## 🧑‍💻 Integrantes da Equipe

| Nome | Função | Responsabilidade |
|---|---|---|
| Artur de Assis | Desenvolvedor | Desenvolvimento do aplicativo |
| Fábio Rodrigues | Desenvolvedor | Processamento e classificação de áudio |
| Nickloas Bueno | Desenvolvedor | Integração com smartwatch |
| Nicolas Rodrigues | Pesquisador | Documentação e organização do projeto |
| David Balmart | Documentação | Documentação e organização do projeto |
| Miguel Bernardo | Documentação | Documentação e organização do projeto |
| Lucas Soares | Documentação | Documentação e organização do projeto |

## 🔐 Controle de Acesso

O protótipo inicial não prevê sistema de autenticação ou gerenciamento de usuários, pois seu foco está na identificação de estímulos sonoros e na geração de respostas táteis.

## 📷 Protótipos / Telas

Os protótipos de interface e diagramas de funcionamento serão adicionados conforme o desenvolvimento do projeto.

## 📦 Como Executar o Projeto

### Pré-requisitos

- Flutter SDK instalado;
- Android Studio e Android SDK configurados;
- Visual Studio Code;
- Dispositivo Android ou emulador compatível.

### Instalação

**1. Clone o repositório:**

```bash
git clone (https://github.com/arturassisrf0/Projeto_Inkluwatch_Mostra)
```

**2. Entre na pasta do projeto:**

```bash
cd inkluwatch
```

**3. Instale as dependências:**

```bash
flutter pub get
```

**4. Execute o aplicativo:**

```bash
flutter run
```

## 📌 Status do Projeto

**Em desenvolvimento – Fase de prototipagem.**

O desenvolvimento será realizado de maneira incremental, começando pela estrutura do aplicativo e implementação dos padrões de vibração, seguindo para o reconhecimento automático de áudio e, posteriormente, a integração com o smartwatch.

---
