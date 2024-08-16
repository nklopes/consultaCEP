//bloco de inportações do código
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css'; //estilo da página
import api from "./services/api";



function App() {

  //atribuindo o nome para uma constante e indica o valor da sua variável
  const [input, setInput] = useState('');
  const [cep, setCEP] = useState({}); 


  async function handleSearch(){ //função assícrona para trazer informações ao api

    //verificando se o usuário escreveu o canto do cep, caso nao, aparece um alerta
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    //valida um erro que possa acontecer na aplicação
    //try => executa a ação desejada, consulta api e armazena a informação
    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
    //sempre que a aplicação 'try' não der como esperado, o o catch mostra um alerta
    }catch{
      alert("Erro ao buscar CEP!")
      setInput("")
    }
  }

//retona a requisição
return (
  <div className="container">
    <h1 className="title">Buscador CEP</h1>

    <div className="containerInput">

//é o onde o usuário vai digitar o que é desejado
      <input
      type="text"
      placeholder="Digite seu CEP..."
      value={input}
//captura tudo o que é sesajo pelo o usuário
      onChange={(e) => setInput(e.target.value)} //altera o valor da variável input e substitui o que o usuário atribuiu
    />
//criação de um botão, selecionando tamanho e cor, além de que quando o usuário aperta no botao, o botao chama a requisição do try
    <button className="buttonSearch" onClick={handleSearch}> 
      <FiSearch size={25} color="#FFF"/>
    </button>
</div>

  {Object.keys(cep).length > 0 && (
    <main className="main"> //verifica se a algo no objeto cep se for maior que 0 ele renderiza, caso não, ele não renderiza
      <h2>CEP: {cep.cep}</h2> //adiciona o objeto mais o que complemento adicional
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} {cep.uf}</span>
  </main>
)}

</div>

);
}
//exportação do app, informa que a função app que la pode ser utilizada em outro lugar da aplicação, utilizando o 'import'
export default App;
 

