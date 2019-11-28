import React from 'react';
import { MdPersonAdd, MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { ContentHeader, AddButton, BackButton, SaveButton } from './styles';

export default function ContentHead({ title, newStudent, Default, to, Plan, form }) {
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

        {Plan ? (
          <>
          <AddButton to={to}>
              <MdPersonAdd size={20} color="#fff" />
              <span>CADASTRAR</span>
            </AddButton>
          </>)
        : null 
        }

        {Default ? (
          <>
            <BackButton to={to}>
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <span>BACK</span>
            </BackButton>
            <SaveButton type="submit" form={form}>
              <MdCheck size={20} color="#fff" />
              <span>SAVE</span>
            </SaveButton>
          </>
        ) : null}
      </aside>
    </ContentHeader>
  );
}

ContentHead.propTypes = {
  title: PropTypes.string.isRequired,
  newStudent: PropTypes.bool,
  Default: PropTypes.bool,
  Plan: PropTypes.bool,
  to: PropTypes.string,
};

ContentHead.defaultProps = {
  newStudent: false,
  Default: false,
  Plan: false,
  to: '',
};
