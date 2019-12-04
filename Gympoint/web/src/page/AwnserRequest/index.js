/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { ModalContent, FormContainer } from './styles';
import api from '~/services/api';
import ContentHead from '~/template/ContentHead';
import Container from '~/template/Container';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalHelpOrder, setModalHelpOrder] = useState({});

  // Load Initial Data - HelpOrders
  useEffect(() => {
    async function loadData() {
      const response = await api.get('help-orders');

      setHelpOrders(response.data);
    }

    loadData();
  }, []);

  async function handleSubmit(data) {
    try {
      await api.put(`help-orders/${data.id}/answer`, data);
      toast.success('Resposta enviada');
      setShowModal(false);
    } catch (err) {
      toast.error('Something Went Wrong');
    }
  }

  function handleOnClick(helpOrderId) {
    setModalHelpOrder(
      helpOrders.find(helpOrder => helpOrder.id === helpOrderId)
    );

    setShowModal(true);
  }

  return (
    <Container>
      <>
        <ContentHead title="Request help" />

        <FormContainer>
          <table>
            <thead>
              <tr>
                <th>STUDENT</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(helpOrder => (
                <tr key={helpOrder.id}>
                  <td>{helpOrder.student.name}</td>
                  <td>
                    <button
                      id={helpOrder.id}
                      className="edit"
                      type="button"
                      onClick={() => handleOnClick(helpOrder.id)}
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FormContainer>

        <ReactModal
          isOpen={showModal}
          shouldCloseOnEsc
          onRequestClose={() => setShowModal(false)}
          ariaHideApp={false}
          style={{
            content: {
              top: '25%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              width: '450px',
              transform: 'translate(-50%, -10%)',
            },
          }}
        >
          <ModalContent>
            <Form id="AnswerForm" onSubmit={handleSubmit}>
              <strong>
                Student Question:
                {modalHelpOrder.student
                  ? ` ${modalHelpOrder.student.name}`
                  : null}
              </strong>
              <p>{modalHelpOrder.question}</p>
              <strong>Answer</strong>
              <Input
                multiline
                name="answer"
                placeholder="Digite sua resposta."
              />
              <Input type="hidden" value={modalHelpOrder.id} name="id" />

              <button onClick={() => {}} type="submit">
                Reply student
              </button>
            </Form>
          </ModalContent>
        </ReactModal>
      </>
    </Container>
  );
}
