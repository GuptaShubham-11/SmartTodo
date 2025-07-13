import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    setModalRoot(root);
  }, []);

  return modalRoot ? createPortal(children, modalRoot) : null;
};

export default ModalPortal;
