cep = document.getElementById('cep')

window.addEventListener('DOMContentLoaded', function() {
    const enderecoSalvo = localStorage.getItem('endereco')

    if (enderecoSalvo) {
        const dados = JSON.parse(enderecoSalvo)
        cep.value = dados.cep
        document.getElementById('cidade').value = dados.cidade
        document.getElementById('estado').value = dados.estado
        document.getElementById('bairro').value = dados.bairro
        document.getElementById('rua').value = dados.logradouro
    }
})

cep.addEventListener('blur', function () {
    
    cepPreenchido = cep.value

    if (!(cepPreenchido.length == 8)){
        window.alert('Preencha um CEP válido')
        return
    }

    fetch(`https://viacep.com.br/ws/${cepPreenchido}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro){
                window.alert('CEP inválido!')
                return
            }
            document.getElementById('cidade').value = dados.localidade
            document.getElementById('estado').value = dados.estado
            document.getElementById('bairro').value = dados.bairro
            document.getElementById('rua').value = dados.logradouro

            const dadosSalvos = {
            cep: cepPreenchido,
            cidade: dados.localidade,
            estado: dados.estado,
            bairro: dados.bairro,
            rua: dados.logradouro 
            }

            localStorage.setItem('endereco', JSON.stringify(dadosSalvos))

        })
        .catch(erro => {
            console.error('Erro ao buscar CEP: ', erro)
        })

        
})
