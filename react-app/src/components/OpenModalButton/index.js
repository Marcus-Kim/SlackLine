import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className,
  icon
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
    e.stopPropagation()
  };

  return (
    <button onClick={e => onClick(e)} className={className}>{icon && <FontAwesomeIcon icon={icon} beat/>}{buttonText}</button>
  );
}

export default OpenModalButton;
