async function carregar() {
  const resposta = await fetch("/usuarios");

  const usuarios = await resposta.json();

  const lista = document.getElementById("lista");

  lista.innerHTML = "";

  usuarios.forEach((usuario) => {
    lista.innerHTML += `
            <p>

                ${usuario.nome}
                (${usuario.idade})

                <button onclick="remover(${usuario.id})">
                    Excluir
                </button>

            </p>
        `;
  });
}

async function cadastrar() {
  const nome = document.getElementById("nome").value;

  const idade = document.getElementById("idade").value;

  await fetch("/usuarios", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome,
      idade,
    }),
  });

  carregar();
}

async function remover(id) {
  await fetch(`/usuarios/${id}`, {
    method: "DELETE",
  });

  carregar();
}

carregar();
