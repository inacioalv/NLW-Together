<h2 align="center">
  NLW TOGETHER
</h2>


<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


<br>


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/?hl=pt-br)

## 💻 Projeto

O Togethe é um aplicativo web que possibilita o usuário possa realizar perguntas,
a pergunta que tiver maior quantidade de like será respondida pelo administrador.
Essa versão foi adicionado o estilo dark e modal na exclusão da pergunta.
Objetivo desse NLW e mostrar o uso de autenticar usando o login do Google com typeScript,
permitindo que os usuários se autentiquem com o Firebase usando google. 
evento oferecido pela [Rocketseat](https://rocketseat.com.br/)


## 🔖 Layout

Nos link abaixo você encontra o layout do projeto web.Precisa ter uma conta no [Figma](http://figma.com/) para acessá-lo.

- [Layout Web](https://www.figma.com/file/L60qDkdlmKREGWuk4sxYmR/Letmeask-(Copy))


<img alt="Logo do projeto" src="/letmeask/public/img/letmeask.gif" />


## Realtime Database Regras

{
 
 "rules": {<br/>
    "rooms": {<br/>
      ".read": false,<br/>
      ".write": "auth != null",<br/>
      "$roomId": {<br/>
        ".read": true,<br/>
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",<br/>
        "questions": {<br/>
          ".read": true,<br/>
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",<br/>
          "likes": {<br/>
            ".read": true,<br/>
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",  <br/>
          }
        }
      }
    }
  }
}



## :joystick: How to Use

### Requirements

To run the application you'll need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
* Clone the repository:
  * ```$ git clone https://github.com/inacioalv/NLW-Together.git ```


Now go to project folder and run:


```bash


# install the dependencies
$ yarn

# run web app
$ yarn dev
```




## 📝 Licença

Este projeto esta sobe a licença MIT. Veja a [LICENÇA](https://opensource.org/licenses/MIT) para saber mais.


