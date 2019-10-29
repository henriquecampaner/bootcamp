import React, {Component} from 'react';

class Techlist extends Component {
  state ={
    newTech: '',
    techs: [
      'Node.Js',
      'ReactJS',
      'React Native'
    ]
  };

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

  hndleDelete = (tech) =>{
    this.setState({techs: this.state.techs.filter(t => t !== tech)})
    // usa-se o filter para retornar apenas as techs que sejam diferente da tech atual
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
        {this.state.techs.map(tech =>(
          <li key={tech}>
            {tech}
            <button onClick={() => this.hndleDelete(tech)} type="button">Remove</button>
            {/* cria-se uma nova funcao, assim so sera executada quando o user clicar (no caso de func com arg) */}
          </li>
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