document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Lógica de login simples: qualquer usuário/senha funciona para este exemplo estático
    // Mas para simular um login, vamos usar um usuário/senha fixos
    if (username === 'membro' && password === '123') {
        // Login bem-sucedido: armazena estado e redireciona
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'members.html';
    } else {
        // Login falhou: exibe mensagem de erro
        errorMessage.style.display = 'block';
    }
});
