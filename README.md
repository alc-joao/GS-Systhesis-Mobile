# 🚀 Systhesis

Aplicativo mobile desenvolvido para a **Global Solution FIAP**, com foco na simulação da gestão de colônias espaciais em ambientes extremos, como a Lua e Marte.

## 👨‍💻 Integrantes

* João Victor Alcântara — RM562707
* Phillipo Barbosa — RM565399
* Eduardo Martins — RM562259

---

## 📌 Sobre o Projeto

O **Systhesis** é uma aplicação mobile que propõe uma experiência interativa de gerenciamento de colônias espaciais. O usuário assume o papel de administrador de uma base extraterrestre, sendo responsável pelo monitoramento de recursos essenciais e pela tomada de decisões estratégicas para garantir a sobrevivência da colônia.

O projeto foi desenvolvido com base no tema da Global Solution FIAP, abordando desafios relacionados à exploração espacial, sustentabilidade e produção de recursos em ambientes extremos.

---

## 🎯 Objetivo

Criar uma plataforma capaz de simular a administração de colônias espaciais, permitindo ao usuário acompanhar indicadores da base, realizar missões, enfrentar desafios e gerenciar recursos fundamentais para a sobrevivência dos habitantes.

---

## ✨ Funcionalidades

* Autenticação de usuários
* Criação de colônias espaciais
* Dashboard da colônia
* Monitoramento de recursos
* Sistema de missões
* Sistema de desafios
* Central de alertas
* Ranking de desempenho
* Perfil do usuário
* Integração com API Java

---

## 📱 Tecnologias Utilizadas

### Front-end Mobile

* React Native
* Expo
* Expo Router
* TypeScript

### Integração

* Axios
* JWT Authentication

### Back-end

* Java
* Spring Boot
* API REST

### Persistência

* AsyncStorage (armazenamento local do token)

---

## 🔄 CRUD Implementado

Gerenciamento completo de colônias integrado com API Java:

* Create (POST)
* Read (GET)
* Update (PUT)
* Delete (DELETE)

---

## 📂 Estrutura do Projeto

```text
app/
├── index.tsx
├── login.tsx
├── register.tsx
├── home.tsx
├── colony-create.tsx
├── colony-dashboard.tsx
├── missions.tsx
├── mission-detail.tsx
├── challenge.tsx
├── alerts.tsx
├── ranking.tsx
└── profile.tsx

src/
└── services/
    └── api.ts
```

---

## ▶️ Como Executar

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npx expo start
```

---

## 🔗 Repositório

https://github.com/alc-joao/GS-Systhesis-Mobile

---

## 🎥 Vídeo Demonstrativo

https://www.youtube.com/watch?v=qSO1hHXoD6k

---

## 🌎 Global Solution

Projeto acadêmico desenvolvido para a FIAP com o objetivo de aplicar conceitos de desenvolvimento mobile, experiência do usuário e integração com APIs REST.

O Systhesis busca demonstrar como tecnologias digitais podem auxiliar na administração de colônias espaciais, utilizando autenticação JWT, comunicação com API Java e operações CRUD para gerenciamento das bases criadas pelos usuários.
