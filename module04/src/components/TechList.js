import React, {Component} from 'react';

import TechItem from './TechItem';

class Techlist extends Component {
  state ={
    newTech: '',
    techs: []
  };

  componentDidMount(){
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({techs: JSON.parse(techs)})
    }
  };
  // essa funcao é executada assim que o componente aparece em tela

  componentDidUpdate(prevProps, prevState){
    // recebe o antigo props e state como parametro
    if(prevState.techs !== this.state.techs){
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }

  };
// executado quando houver alteracaoes nas props ou estados

componentWillUnmount() {

  };
// executa quando o componente deixa de existir


  handleInputChange = e => {
    this.setState({newTech: e.target.value})
    // isso me da acesso ao valor digitado no input
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [... this.state.techs, this.state.newTech],
      newTech: '' //reseta o estado de newTech
    });
    // 1- utilizar o operador spread para copiar as informacoes antigas para o novo array ou objeto
    // 2- passar as informacoes que serao adicionadas
    //todo estado e imutavel //setState cria um novo estado com as alteracoes passadas
  }

  handleDelete = (tech) =>{
    this.setState({techs: this.state.techs.filter(t => t !== tech)})
    // usa-se o filter para retornar apenas as techs que sejam diferente da tech atual
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech =>(
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
              // as funcoes para manipular o estado, precisam ficar no mesmo componente do estado
              // passasse a funcao como um propriedade ao componente
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech} //com este value, caso o state altere, o input altera tambem
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default Techlist;