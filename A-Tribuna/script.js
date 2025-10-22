// ============================================
// A TRIBUNA - SCRIPT PRINCIPAL
// ============================================

// Dados do carrossel com fotos e manchetes
const carouselData = [
    {
        image: "https://i.redd.it/j9vj6nj23h9a1.png",
        title: "Governo Anuncia Pacote de Medidas Econômicas para Estimular o Crescimento",
        subtitle: "Acompanhe os principais acontecimentos da política brasileira",
        link: "articles/politica-1.html"
    },
    {
        image: "https://brasil.un.org/sites/default/files/styles/featured_image/public/2023-03/ZWD_banner_small_Dandora_2%2C_Duncan_Moore_UNEP.jpg?itok=651yYg9e",
        title: "Crise Global de Energia: O que o Brasil Pode Aprender com a Europa?",
        subtitle: "Análise aprofundada sobre os desafios e oportunidades no cenário internacional.",
        link: "articles/mundo-1.html"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqDOm1ngj1aVTt2Dij886xZkpJpI2Gy14sKg&s",
        title: "Inovação em SC: Projetos de Educação Tecnológica que Estão Mudando o Futuro",
        subtitle: "Destaques da Semana Nacional de Ciência e Tecnologia.",
        link: "articles/ciencia_tecnologia-1.html"
    },
    {
        image: "https://static.historiadomundo.com.br/2024/06/homens-jogando-futebol-uma-alusao-a-historia-do-esporte-mais-popular-do-mundo.jpg",
        title: "Futebol Nacional: Os Melhores Momentos e Próximos Jogos da Semana",
        subtitle: "Tudo sobre o seu time e as principais competições esportivas.",
        link: "articles/esportes-1.html"
    }
];

let currentSlide = 0;
let slideInterval;

// ============================================
// CAROUSEL FUNCTIONS
// ============================================

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

// ============================================
// COMMENTS FUNCTION
// ============================================

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

// ============================================
// CONTACT FORM
// ============================================

function submitContactForm(event) {
    event.preventDefault();
    alert("Obrigado por sua mensagem! Entraremos em contato em breve.");
    event.target.reset();
}

// ============================================
// INITIALIZATION
// ============================================

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

