import { Modal as ReactstrapModal } from "reactstrap";

interface IModalProps {
  isOpen: boolean;
}

export const Modal: React.FC<IModalProps> = ({ isOpen, children }) => (
  <ReactstrapModal isOpen={isOpen} backdrop="static" fade={false}>
    <div className="modal-body" data-testid="modal">
      {children}
    </div>
  </ReactstrapModal>
);
