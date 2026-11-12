//RESUELVE TUS EJERCICIOS AQUI
/*
 1.- Declara una funcion **getAllBreeds** que devuelva un array de strings con todas las razas de perro.*/
const getAllBreeds = async () => {
    const response= await fetch("https://dog.ceo/api/breeds/list/all")
    const perritos =await response.json()

    return(Object.keys(perritos.message))
}

/* 2.- Declara una función **getRandomDog** que obtenga una imagen random de una raza.*/

const getRandomDog = async () => {
    const response= await fetch("https://dog.ceo/api/breeds/image/random")
    const perritos =await response.json()

    return(perritos.message)
}

/*3.- Declara una función **getAllImagesByBreed** que obtenga todas las imágenes de la raza komondor. */

const getAllImagesByBreed = async () => {
    const response= await fetch("https://dog.ceo/api/breed/komondor/images")
    const perritos =await response.json()

    return(perritos.message)
}

/*4.- Declara una funcion **getAllImagesByBreed2(breed)** que devuelva las imágenes de la raza pasada por el argumento*/

const getAllImagesByBreed2 = async (breed) => {
    const response= await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const perritos =await response.json()

    return(perritos.message)
}

/*5.- Declarara una función **getGitHubUserProfile(username)** que obtenga el perfil de usuario de github a partir de su nombre de usuario. (https://api.github.com/users/{username}).*/

const getGitHubUserProfile = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const userData = await response.json()

    return(userData)
}


/* 6.- Declara una función **printGithubUserProfile(username)** que reciba como argumento el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM.*/
const printGithubUserProfile = async (username) => {
    const userData = await getGitHubUserProfile(username);

    const img = userData.avatar_url;//para la foto de perfil, https://githubusercontent.com
    const name = userData.name;

    const imgElement = document.createElement("img");// Creamos los elementos para pintarlos en el DOM
        imgElement.src = img;
        imgElement.alt = name;

    const nameElement = document.createElement("h3");
        nameElement.textContent = name;

    document.body.append(imgElement);// Los añadimos al body del documento
    document.body.append(nameElement);
        return { img, name };
}

/* 7. Crea una función **getAndPrintGitHubUserProfile(username)** que contenga una petición a la API para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma:

```html
<section>
    <img src="url de imagen" alt="imagen de usuario">
    <h1>Nombre de usuario</h1>
    <p>Public repos: (número de repos)</p>
</section> */

async function getAndPrintGitHubUserProfile(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();

  return `<section>
    <img src="${user.avatar_url}" alt="${user.name}">
    <h1>${user.name}</h1>
    <p>Public repos: ${user.public_repos}</p>
</section>`;
}


/* 8.-Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después llamaremos a la función **getAndPrintGitHubUserProfile(username)** que se ejecute cuando se pulse el botón buscar.(Esto no se testea). */

const input = document.querySelector('#usernameInput');
const searchBtn = document.querySelector('#searchBtn');
const container = document.querySelector('#userContainer');

searchBtn.addEventListener('click', async () => {
  const username = input.value.trim();

  if (username) {
    const profileHTML = await getAndPrintGitHubUserProfile(username);
    container.innerHTML = profileHTML;
  }
});

/* 9.- Dada una lista de usuarios de github guardada en una array,crea una funcion **fetchGithubUsers(userNames)** que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario. \
Objetivo: Usar Promise.all()\
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.\
Pregunta. ¿cuántas promesas tendremos?*/

/*
Respuesta:
Tantas cuanto elementos tenga el array, ya que el método map ejecuta una llamada fetch individual por cada nombre de usuario de la ByteLengthQueuingStrategy.*/


/*
Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.
Pasos:
- Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
- Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
- Cuando Promise.all() haya terminado:
Consigue que se imprima por consola la url del repositorio de cada usuario.
Consigue que se imprima por consola el nombre de cada usuario.*/


async function fetchGithubUsers(userNames) {
  // 1. Mapeamos el array para lanzar un fetch por cada usuario (obtenemos un array de promesas)
  const promises = userNames.map((name) =>
    fetch(`https://api.github.com/users/${name}`).then((response) => response.json())
  );

  // 2. Esperamos a que todas las promesas se resuelvan a la vez con Promise.all()
  const users = await Promise.all(promises);

  // 3. Imprimimos por consola lo que pide el enunciado y retornamos el array para los tests
  users.forEach((user) => {
    console.log(user.repos_url);
    console.log(user.name);
  });

  return users;
}
