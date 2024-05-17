document.addEventListener('DOMContentLoaded', () => {
    const carroSelect = document.getElementById('carro');
    const diasInput = document.getElementById('dias');
    const finalizarBtn = document.getElementById('finalizar-btn');
    const resumoPedido = document.getElementById('resumo-pedido');
    const listaPedidos = document.getElementById('lista-pedidos');
    let pedidos = [];

    carroSelect.addEventListener('change', atualizarResumo);
    diasInput.addEventListener('input', atualizarResumo);

    finalizarBtn.addEventListener('click', () => {
        const carro = carroSelect.value;
        const precoDiaria = carroSelect.options[carroSelect.selectedIndex].dataset.preco;
        const dias = parseInt(diasInput.value);
        const dataRetirada = document.getElementById('data-retirada').value;
        const dataEntrega = document.getElementById('data-entrega').value;
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const estadoCivil = document.getElementById('estado-civil').value;
        const telefone = document.getElementById('telefone').value;

        if (carro && dias && dataRetirada && dataEntrega && nome && email && estadoCivil && telefone) {
            const total = dias * precoDiaria;
            const pedido = {
                carro,
                dias,
                dataRetirada,
                dataEntrega,
                nome,
                email,
                estadoCivil,
                telefone,
                total
            };

            pedidos.push(pedido);
            atualizarResumo();
            atualizarListaPedidos();

            // Limpar formulário
            document.getElementById('aluguel-form').reset();
            resumoPedido.innerHTML = 'Total: R$0,00';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    function atualizarResumo() {
        const precoDiaria = carroSelect.options[carroSelect.selectedIndex].dataset.preco;
        const dias = parseInt(diasInput.value);

        if (!isNaN(dias)) {
            const total = dias * precoDiaria;
            resumoPedido.innerHTML = `Total: R$${total.toFixed(2)}`;
        } else {
            resumoPedido.innerHTML = 'Total: R$0,00';
        }
    }

    function atualizarListaPedidos() {
        listaPedidos.innerHTML = '';
        pedidos.forEach(pedido => {
            const li = document.createElement('li');
            li.innerHTML = `
                Carro: ${pedido.carro}, Dias: ${pedido.dias}, Total: R$${pedido.total.toFixed(2)}
                <br>Data de Retirada: ${pedido.dataRetirada}, Data de Entrega: ${pedido.dataEntrega}
                <br>Nome: ${pedido.nome}, Email: ${pedido.email}, Estado Civil: ${pedido.estadoCivil}, Telefone: ${pedido.telefone}
            `;
            listaPedidos.appendChild(li);
        });
    }
});

function searchFunction() {
    // Declare variáveis
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("ordersTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2]; // O índice 2 representa a coluna do nome do cliente
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    // Se nenhum resultado correspondente for encontrado, exibe uma mensagem na tabela
    var found = false; // Variável para rastrear se foram encontrados resultados correspondentes
    for (i = 1; i < tr.length; i++) {
        if (tr[i].style.display === "") {
            found = true;
            break;
        }
    }

    if (!found) {
        // Oculta o cabeçalho da tabela e mostra a mensagem
        table.style.display = "none";
        var noResultMessage = document.createElement("div");
        noResultMessage.textContent = "Não há pedidos com esse nome";
        document.getElementById("lista-pedidos").appendChild(noResultMessage);
    } else {
        // Mostra o cabeçalho da tabela e esconde a mensagem
        table.style.display = "";
        var messageToRemove = document.getElementById("lista-pedidos").getElementsByTagName("div")[0];
        if (messageToRemove) {
            messageToRemove.remove();
        }
    }
}
