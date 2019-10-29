import React from 'react';
import PropTypes from 'prop-types';

function TechItem({ tech, onDelete }) {
    return (
        <li>
            {tech}
            <button onClick={onDelete} type="button">Remove</button>
            {/* cria-se uma nova funcao, assim so sera executada quando o user clicar (no caso de func com arg) */}
        </li>
    )
}

TechItem.defaultProps = {
    tech: 'Oculto',
};
// a propriedade assumento o valor oculto caso nao seja passada nenhuma propriedade

TechItem.PropTypes = {
    tech: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};
// PropTypes valida o tipo de dado recebido via props e se é obrigatorio

export default TechItem;