// ===========================
// HEADER
// ===========================

const header = document.querySelector("header");

if (header) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
    } else {
      header.style.boxShadow = "none";
    }

  });

}

// ===========================
// CARROSSEL
// ===========================

const slide = document.getElementById("slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (slide && nextBtn && prevBtn) {

  const imagens = [

    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1200&auto=format&fit=crop",

    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"

  ];

  let index = 0;

  nextBtn.addEventListener("click", () => {

    index++;

    if (index >= imagens.length) {
      index = 0;
    }

    slide.src = imagens[index];

  });

  prevBtn.addEventListener("click", () => {

    index--;

    if (index < 0) {
      index = imagens.length - 1;
    }

    slide.src = imagens[index];

  });

}

// ===========================
// CADASTRO DE USUÁRIAS
// ===========================

const formUsuaria = document.getElementById("formUsuaria");

if (formUsuaria) {

  formUsuaria.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefoneInput = document.getElementById("telefone");

      if (telefoneInput) {

        telefoneInput.addEventListener("input", function(e) {

             let valor = e.target.value.replace(/\D/g, '');

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        valor = valor.replace(
            /^(\d{2})(\d{0,5})(\d{0,4}).*/,
            function(match, ddd, parte1, parte2) {

                let resultado = "";

                if (ddd) resultado += `(${ddd}`;

                if (ddd.length === 2) resultado += ") ";

                if (parte1) resultado += parte1;

                if (parte2) resultado += "-" + parte2;

                return resultado;
            }
        );

        e.target.value = valor;
        });

    }
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const data_nascimento = document.getElementById("data_nascimento").value;
    try {

      const response = await fetch("/usuarios/cadastro", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          nome,
          email,
          telefone,
          cidade,
          estado,
          data_nascimento,
          senha
        })

      });

      const data = await response.json();

      abrirModal(
"Bem-vinda à AURA",
"Sua conta foi criada com sucesso. Estamos felizes em ter você conosco."
);

      formUsuaria.reset();

    } catch (error) {

      console.error("Erro:", error);

      alert("Erro ao cadastrar usuária.");

    }

  });

}

// ===========================
// CADASTRO DE PARCEIROS
// ===========================

const formParceiro = document.getElementById("formParceiro");

if (formParceiro) {

  formParceiro.addEventListener("submit", async (e) => {

    e.preventDefault();

    const empresa = document.getElementById("empresa").value;
    const email = document.getElementById("emailParceiro").value;
    const telefone = document.getElementById("telefone").value;

    try {

      const response = await fetch("/parceiros/cadastro", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          empresa,
          email,
          telefone
        })

      });

      const data = await response.json();

      abrirModal(
        "Solicitação Recebida",
        "Recebemos seu interesse em fazer parte da rede de parceiros AURA. Nossa equipe realizará uma análise das informações enviadas e entrará em contato através do e-mail informado para apresentar os próximos passos do processo de parceria."
);
      formParceiro.reset();

    } catch (error) {

      console.error("Erro:", error);

      alert("Erro ao cadastrar parceiro.");

    }

  });

}

const btnUsuaria = document.getElementById("btnUsuaria");
const btnParceiro = document.getElementById("btnParceiro");

if(btnUsuaria && btnParceiro){

    btnUsuaria.addEventListener("click", () => {

        document.getElementById("formUsuaria").style.display = "flex";
        document.getElementById("formParceiro").style.display = "none";

        btnUsuaria.classList.add("active");
        btnParceiro.classList.remove("active");

    });

    btnParceiro.addEventListener("click", () => {

        document.getElementById("formUsuaria").style.display = "none";
        document.getElementById("formParceiro").style.display = "flex";

        btnParceiro.classList.add("active");
        btnUsuaria.classList.remove("active");

    });

}

function abrirModal(titulo,texto){

    document.getElementById("modalTitulo").innerText = titulo;

    document.getElementById("modalTexto").innerText = texto;

    document.getElementById("modal").style.display = "flex";

}

function fecharModal(){

    document.getElementById("modal").style.display = "none";

}
