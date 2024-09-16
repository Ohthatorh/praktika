import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDialog({show, handleCancel, handleAppend}) {
  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить задачу? Действие необратимо</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleAppend}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDialog;