// ===========================
// HEADER
// ===========================

const header = document.querySelector("header");
console.log("Página carregada");

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
    const telefone = document.getElementById("telefone").value;
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

const btnEntendi = document.getElementById("btnEntendi");

if (btnEntendi) {
    btnEntendi.addEventListener("click", () => {
        window.location.href = "/plataforma.html";
    });
}

// Formatação dinâmica do telefone
const inputTelefone = document.getElementById("telefone");

if (inputTelefone) {

    inputTelefone.addEventListener("input", (e) => {  
        let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito

        if (valor.length > 11) {
            valor = valor.slice(0, 11); // Limita a 11 dígitos
        }

        if (valor.length > 0) {
            valor = "(" + valor; // Adiciona parêntese no início
        }
        if (valor.length > 3) {
            valor = valor.slice(0, 3) + ") " + valor.slice(3); // Adiciona parêntese de fechamento e espaço
        }
        if (valor.length > 10) {
            valor = valor.slice(0, 10) + "-" + valor.slice(10); // Adiciona hífen
        }

        e.target.value = valor;
    });
}

// ==========================================
// MAPA
// ==========================================

let map = null;

if (document.getElementById("map")) {

    map = L.map("map").setView(
        [-23.55052, -46.633308],
        13
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(map);

}

// ==========================================
// LOCALIZAÇÃO
// ==========================================

const locationPopup = document.getElementById("locationPopup");
const blockedScreen = document.getElementById("blockedScreen");

const allowAlways = document.getElementById("allowAlways");
const allowOnce = document.getElementById("allowOnce");
const denyLocation = document.getElementById("denyLocation");

console.log("Mapa:", map);
console.log("Popup:", locationPopup);
console.log("Allow:", allowAlways);
console.log("Deny:", denyLocation);

function getLocation() {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            map.setView([lat, lng], 16);

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup("Você está aqui 💜")
                .openPopup();

            locationPopup.style.display = "none";
        },

        () => {
            alert("Não foi possível obter sua localização.");
        }

    );
}

allowAlways?.addEventListener("click", getLocation);
allowOnce?.addEventListener("click", getLocation);

denyLocation?.addEventListener("click", () => {

    locationPopup.classList.add("hidden");
    blockedScreen.classList.remove("hidden");

});

// ==========================================
// PERFIL
// ==========================================

const profileButton = document.getElementById("profileButton");
const profilePanel = document.getElementById("profilePanel");
const closeProfile = document.getElementById("closeProfile");

profileButton?.addEventListener("click", () => {

    profilePanel.classList.remove("hidden");

});

closeProfile?.addEventListener("click", () => {

    profilePanel.classList.add("hidden");

});

// ==========================================
// ALTERAR NOME
// ==========================================

const editName = document.getElementById("editName");
const editPanel = document.getElementById("editPanel");
const closeEditPanel = document.getElementById("closeEditPanel");

const saveName = document.getElementById("saveName");
const userName = document.getElementById("userName");
const nameInput = document.getElementById("nameInput");

editName?.addEventListener("click", () => {

    editPanel.classList.remove("hidden");

});

closeEditPanel?.addEventListener("click", () => {

    editPanel.classList.add("hidden");

});

saveName?.addEventListener("click", () => {

    const novoNome = nameInput.value.trim();

    if (novoNome !== "") {

        userName.textContent = novoNome;

        localStorage.setItem(
            "nomeAura",
            novoNome
        );

        editPanel.classList.add("hidden");

    }

});

window.addEventListener("load", () => {

    const nomeSalvo = localStorage.getItem("nomeAura");

    if (nomeSalvo) {

        userName.textContent = nomeSalvo;

    }

});

// ==========================================
// COMENTÁRIOS DA ROTA
// ==========================================

const commentsScreen =
document.getElementById("commentsScreen");

const showComments =
document.getElementById("showComments");

const closeComments =
document.getElementById("closeComments");

const closeCommentsX =
document.getElementById("closeCommentsX");

showComments?.addEventListener("click", () => {

    commentsScreen.classList.remove("hidden");

});

closeComments?.addEventListener("click", () => {

    commentsScreen.classList.add("hidden");

});

closeCommentsX?.addEventListener("click", () => {

    commentsScreen.classList.add("hidden");

});

// ==========================================
// AVALIAÇÃO DO APP
// ==========================================

const reviewPanel =
document.getElementById("reviewPanel");

const openReviewPanel =
document.getElementById("openReviewPanel");

const closeReviewPanel =
document.getElementById("closeReviewPanel");

openReviewPanel?.addEventListener("click", () => {

    reviewPanel.classList.remove("hidden");

});

closeReviewPanel?.addEventListener("click", () => {

    reviewPanel.classList.add("hidden");

});

// ==========================================
// ESTRELAS
// ==========================================

let rating = 0;

const stars =
document.querySelectorAll(".star");

stars.forEach((star) => {

    star.addEventListener("click", () => {

        rating = star.dataset.value;

        stars.forEach((s) => {

            if (s.dataset.value <= rating) {

                s.style.color = "#d4a017";

            } else {

                s.style.color = "#ccc";

            }

        });

    });

});

// ==========================================
// ENVIAR AVALIAÇÃO
// ==========================================

const sendReview =
document.getElementById("sendReview");

sendReview?.addEventListener("click", () => {

    alert(
        "Obrigada pela sua avaliação! 💜"
    );

    reviewPanel.classList.add("hidden");

});

// ==========================================
// SOS
// ==========================================

const sosButton =
document.getElementById("sosButton");

const sosScreen =
document.getElementById("sosScreen");

const cancelSos =
document.getElementById("cancelSos");

sosButton?.addEventListener("click", () => {

    sosScreen.classList.remove("hidden");

});

cancelSos?.addEventListener("click", () => {

    sosScreen.classList.add("hidden");

});

// ==========================================
// ROTAS FAVORITAS
// ==========================================

const favoriteRoutes =
document.getElementById("favoriteRoutes");

const reviews =
document.getElementById("reviews");

const info =
document.getElementById("info");

const subPanel =
document.getElementById("subPanel");

const subContent =
document.getElementById("subContent");

const closeSubPanel =
document.getElementById("closeSubPanel");

favoriteRoutes?.addEventListener("click", () => {

    subPanel.classList.remove("hidden");

    subContent.innerHTML = `
        <h2>⭐ Rotas Favoritadas</h2>
        <p>Você ainda não possui rotas salvas.</p>
    `;

});

reviews?.addEventListener("click", () => {

    subPanel.classList.remove("hidden");

    subContent.innerHTML = `
        <h2>💬 Avaliações</h2>
        <p>Nenhuma avaliação registrada.</p>
    `;

});

info?.addEventListener("click", () => {

    subPanel.classList.remove("hidden");

    subContent.innerHTML = `
        <h2>✨ Sobre o Aura</h2>
        <p>
        Plataforma criada para aumentar
        a segurança feminina através de
        rotas avaliadas pela comunidade.
        </p>
    `;

});

closeSubPanel?.addEventListener("click", () => {

    subPanel.classList.add("hidden");

});