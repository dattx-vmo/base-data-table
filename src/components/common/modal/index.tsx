import { Fragment, useState, useImperativeHandle, forwardRef, isValidElement } from 'react';
import {Button, Modal} from 'flowbite-react';

interface IProps {
  showFooter?: boolean;
  showHeader?: boolean;
  size?: string; //sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
}

interface IComponentRef {
  handlerModal: (params: any) => Promise<[any, any]>;
  handlerOpen: (status: boolean) => void;
}

const BaseModal = forwardRef<IComponentRef, IProps>(({showHeader = true, showFooter = true, size = 'xl'}, ref) => {
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string | JSX.Element>("");
  const [body, setBody] = useState<string | JSX.Element>("");
  const [promiseCallback, setPromiseCallback] = useState<any>(null);

  useImperativeHandle(ref, () => ({
    handlerModal({show, title, body}) {
      setShow(show)
      setTitle(title)
      setBody(body)
      return new Promise((resolve, reject) => {
        setPromiseCallback({resolve, reject});
      });
    },
    handlerOpen(status) {
      setShow(status)
    },
  }));

  const onSave = () => {
    setShow(false);
    promiseCallback?.resolve({
      status: true,
      type: 'save',
    });
  }

  const onclose = () => {
    setShow(false);
    promiseCallback?.reject({
      status: true,
      type: 'close',
    });
  }

  return <>
    <Fragment>
      <Modal
        dismissible={true}
        show={show}
        size={size}
        onClose={onclose}
        className='base-modal'
      >
        {showHeader && <Modal.Header>
          {title}
        </Modal.Header>}
        
        <Modal.Body>
          <div className="space-y-6 max-h-[50vh] overflow-auto">
            {body}
          </div>
        </Modal.Body>
        
        {showFooter && <Modal.Footer className="flex items-center justify-end">
          <Button onClick={onSave}>
            OK
          </Button>
          <Button
            color="gray"
            onClick={onclose}
          >
            Cancel
          </Button>
        </Modal.Footer>}
      </Modal>
    </Fragment>
  </>
})

export default BaseModal;