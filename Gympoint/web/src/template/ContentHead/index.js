import React, { useState } from 'react';
import { MdPersonAdd, MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import PropTypes from 'prop-types';
import { ContentHeader, AddButton, BackButton, SaveButton } from './styles';
import api from '~/services/api';

export default function ContentHead({
  title,
  newStudent,
  Default,
  to,
  Create,
  form,
  setStudents,
}) {
  const [search, setSearch] = useState('');
  async function handleKeyPress(key) {
    if (key === 'Enter') {
      const { data } = await api.get('students', {
        params: {
          name: search,
        },
      });
      setStudents(data);
    }
  }
  function handleSearch(input) {
    setSearch(input);
  }
  return (
    <ContentHeader>
      <h2>{title}</h2>

      <aside>
        {newStudent ? (
          <>
            <AddButton to={to}>
              <MdPersonAdd size={20} color="#fff" />
              <span>NEW REGISTER</span>
            </AddButton>
            <input
              placeholder="Search student"
              onChange={e => handleSearch(e.target.value)}
              onKeyPress={e => handleKeyPress(e.key)}
            />
          </>
        ) : null}

        {Create ? (
          <>
            <AddButton to={to}>
              <MdPersonAdd size={20} color="#fff" />
              <span>NEW REGISTER</span>
            </AddButton>
          </>
        ) : null}

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
  Create: PropTypes.bool,
  to: PropTypes.string,
  form: PropTypes.string,
  setStudents: PropTypes.func,
};

ContentHead.defaultProps = {
  setStudents: null,
  newStudent: false,
  Default: false,
  Create: false,
  to: '',
  form: null,
};
