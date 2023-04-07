# ✨Laryum Bot✨


## Descripción 💫
Laryum es un bot de entretenimiento que ha sido integrada con ChatGPT para ofrecer una experiencia más completa y variada a los usuarios. Este bot tiene la capacidad de reproducir música de diferentes géneros y artistas, permitiendo a los usuarios disfrutar de sus canciones favoritas sin tener que abandonar la conversación en la que se encuentran 🤖
## Captura de pantalla 📌
[![image.png](https://i.postimg.cc/GmwPzkPs/image.png)](https://postimg.cc/ZCHy5vMT)

## Requerimientos📋
- Node.JS V18+
- Discord.JS V14+
- Token de Discord [Discord Developer Portal](https://discord.com/developers/applications)
- Clave de API de OpenAI [OpenAI Developer Portal](https://platform.openai.com/account/api-keys)
## Instalación 🔧
Clone el repositorio ejecutando:
```
git clone https://github.com/lyrsk/LaryumBot.git
```
Instale las dependencias ejecutando:
```
npm i
```
## Configuración ⚙️
- Cambie el nombre de `.env.default` por `.env`
- Edite el archivo `.env` asignando los valores requeridos:
```
TOKEN= #Token del bot

CLIENT_ID= #ID de la aplicación (bot)

GUILD_ID= #ID del servidor de Discord

OPENAI_KEY= #Clave de OpenAI

BOT_CHANNEL= #ID del canal en el que se ejecutará el chatbot
```
> ID de la aplicación (bot) se encuentra en el portal para desarrolladores de Discord.
>
> ID del servidor de Discord puede obtenerse dando click derecho al nombre del servidor y copiando su ID.
## Despliegue 🚀
Ejecute lo siguiente para encender el bot de Discord:
```
node app
```
> 💡 En caso de que la canción se corte sin motivo, cambie la región del canal de voz 💡
## Construido con 🛠️
- [Discord.JS](https://discord.js.org/#/) 
- [OpenAI](https://platform.openai.com)
- [Distube.JS](https://distube.js.org/#/)

## Autor ✒️
- [@lyrsk]

## Licencia📄
```
MIT License
```

