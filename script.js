class Formulario {
    constructor () {
       this.cep = document.getElementById('cep') 
       this.localidade = document.getElementById('cidade')
       this.estado = document.getElementById('estado')
       this.bairro = document.getElementById('bairro')
       this.logradouro = document.getElementById('rua')
       this.numero = document.getElementById('numero')
       this.complemento = document.getElementById('complemento')

       this.numero.addEventListener('blur', () => this.atualizaLocalStorage())
       this.complemento.addEventListener('blur', () => this.atualizaLocalStorage())
    }

    atualizaLocalStorage() {
        const dadosSalvos = {
        cep: this.cep.value,
        localidade: this.localidade.value,
        estado: this.estado.value,
        bairro: this.bairro.value,
        logradouro: this.logradouro.value,
        numero: this.numero.value,
        complemento: this.complemento.value
        }
        
        localStorage.setItem('endereco', JSON.stringify(dadosSalvos))
    }

    carregaDadosSalvos () {
        const enderecoSalvo = localStorage.getItem('endereco')

        if (enderecoSalvo) {
            const dados = JSON.parse(enderecoSalvo)
            this.cep.value = dados.cep
            this.localidade.value = dados.localidade
            this.estado.value = dados.estado
            this.bairro.value = dados.bairro
            this.logradouro.value = dados.logradouro
            this.numero.value = dados.numero
            this.complemento.value = dados.complemento
        }
    }

    preencheFormulárioViaCep () {
        const cepPreenchido = this.cep.value

        if (!(cepPreenchido.length == 8)){
            window.alert('Preencha um CEP válido!')
            return
        }

        fetch(`https://viacep.com.br/ws/${cepPreenchido}/json/`)
            .then(response => response.json())
            .then(dados => {
                if (dados.erro){
                    window.alert('CEP inválido')
                    return
                }
            
                this.localidade.value = dados.localidade
                this.estado.value = dados.estado
                this.bairro.value = dados.bairro
                this.logradouro.value = dados.logradouro

                const dadosSalvos = {
                    cep: cepPreenchido,
                    localidade: dados.localidade,
                    estado: dados.estado,
                    bairro: dados.bairro,
                    logradouro: dados.logradouro,
                    numero: this.numero.value,
                    complemento: this.complemento.value
                }

                localStorage.setItem('endereco', JSON.stringify(dadosSalvos))
            })

            .catch(erro => {
                console.error('Erro ao buscar CEP', erro)
            })
    }
}


const formulario = new Formulario()
window.addEventListener('DOMContentLoaded', () => formulario.carregaDadosSalvos())
formulario.cep.addEventListener('blur', () => formulario.preencheFormulárioViaCep())
