import React from 'react';
import { ContentHeader, AddButton, BackButton, SaveButton } from './styles';
import { MdPersonAdd, MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

export default function StudentHeader(props) {
  return (
    <ContentHeader>
        <h2>{props.title}</h2>

        <aside>

            {props.newStudent ? (
                <>
            <AddButton to="/">
                <MdPersonAdd size={20} color="#fff" />
                <span>CADASTRAR</span>
            </AddButton>
            <input placeholder="Search student" />
            </>)
        : null
        }

        {props.Default ? (
        <>
          <BackButton to="/">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>BACK</span>
          </BackButton>
          <SaveButton type="submit" form="form">
            <MdCheck size={20} color="#fff" />
            <span>SAVE</span>
          </SaveButton>
          </>)
        : null  
        }

        </aside>
    </ContentHeader>
  );
}
