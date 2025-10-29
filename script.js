// Dados do carrossel com fotos e manchetes
const carouselData = [
    {
        image: "https://i.redd.it/j9vj6nj23h9a1.png",
        title: "Governo Anuncia Pacote de Medidas Econômicas para Estimular o Crescimento",
        subtitle: "Acompanhe os principais acontecimentos da política brasileira",
        link: "articles/politica-1.html"
    },
    {
        image: "https://conteudo.imguol.com.br/c/noticias/17/2025/10/22/guardas-sao-vistos-na-frente-do-louvre-em-22out2025-dia-da-reabertura-do-museu-apos-assalto-1761150846766_v2_900x506.jpg.webp",
        title: "Roubo no Louvre mobiliza autoridades francesas e internacionais",
        subtitle: "Um golpe audacioso em menos de vinte minutos deixa a França em alerta e reacende o debate sobre a segurança do patrimônio histórico.",
        link: "articles/mundo-1.html"
    },
    {
        image: "https://i.ibb.co/jvxJnctd/satelite.png",
        title: "Satélites brasileiros monitoram desmatamento na Amazônia em tempo real",
        subtitle: "Tecnologia espacial a serviço do meio ambiente e da preservação da floresta.",
        link: "articles/ciencia_tecnologia-1.html"
    },
    {
        image: "https://i.ibb.co/C5L5RY63/futebol.png",
        title: "Seleção brasileira vence amistoso com nova geração em campo",
        subtitle: "Com gols e personalidade, jovens talentos mostram força e prometem protagonismo rumo à próxima Copa do Mundo.",
        link: "articles/esportes-1.html"
    }
];

let currentSlide = 0;
let slideInterval;

// Funções do CARROSSEL

function renderCarousel() {
    const container = document.querySelector(".carousel-container");
    if (!container) return;

    container.innerHTML = ''; // Limpa o conteúdo existente

    carouselData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        if (index === 0) {
            slide.classList.add('active');
        }

        slide.innerHTML = `
            <a href="${item.link}">
                <img src="${item.image}" alt="${item.title}">
                <div class="carousel-text">
                    <h3>${item.title}</h3>
                    <p>${item.subtitle}</p>
                </div>
            </a>
        `;
        container.appendChild(slide);
    });
}

function showSlide(n) {
    const slides = document.querySelectorAll(".carousel-slide");
    if (slides.length === 0) return;

    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove("active"));
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add("active");
    }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function startAutoSlide() {
    // Limpa o intervalo anterior para evitar duplicação
    clearInterval(slideInterval); 
    // Troca de slide a cada 5 segundos
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000); 
}

// Funções dos COMENTÁRIOS

function addComment(event) {
    event.preventDefault();
    const textarea = event.target.querySelector("textarea");
    const commentsList = event.target.parentElement.querySelector(".comments-list");
    
    if (!textarea.value.trim()) {
        alert("Por favor, escreva um comentário");
        return;
    }
    
    const comment = document.createElement("div");
    comment.className = "comment";
    comment.innerHTML = `
        <strong>Você</strong>
        <p>${textarea.value}</p>
        <small>${new Date().toLocaleDateString("pt-BR")}</small>
    `;
    commentsList.appendChild(comment);
    textarea.value = "";
}

function submitContactForm(event) {
    event.preventDefault();
    alert("Obrigado por sua mensagem! Entraremos em contato em breve.");
    event.target.reset();
}

// INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", function() {
    // Renderiza o carrossel na página inicial
    if (document.querySelector(".carousel-section")) {
        renderCarousel();
        showSlide(currentSlide);
        startAutoSlide();
    }
    
    // Adiciona event listeners para os botões de voltar, se existirem
    const backButtons = document.querySelectorAll(".btn-back");
    backButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            window.history.back();
        });
    });
});

document.querySelector(".menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav-menu").classList.toggle("active");
});

