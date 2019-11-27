import React from 'react';
import { MdPersonAdd, MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { ContentHeader, AddButton, BackButton, SaveButton } from './styles';

export default function StudentHeader({ title, newStudent, Default, to }) {
  return (
    <ContentHeader>
      <h2>{title}</h2>

      <aside>
        {newStudent ? (
          <>
            <AddButton to={to}>
              <MdPersonAdd size={20} color="#fff" />
              <span>CADASTRAR</span>
            </AddButton>
            <input placeholder="Search student" />
          </>
        ) : null}

        {Default ? (
          <>
            <BackButton to="/">
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <span>BACK</span>
            </BackButton>
            <SaveButton type="submit" form="form">
              <MdCheck size={20} color="#fff" />
              <span>SAVE</span>
            </SaveButton>
          </>
        ) : null}
      </aside>
    </ContentHeader>
  );
}

StudentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  newStudent: PropTypes.bool,
  Default: PropTypes.bool,
  to: PropTypes.string,
};

StudentHeader.defaultProps = {
  newStudent: false,
  Default: false,
  to: '',
};
