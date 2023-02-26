
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { globalSelectors } from '../../../global/global.slice';
import organisationsApi from '../../../services/organisationsApi.slice';
import ConfirmationModal from "../../../utils/ConfirmationModal";

const DeleteCustomerRemarkModal = ({
  show,
  setShow,
  callback,
  partnerId,
  remarkId,
  user,
}) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (show) {
      return setShowModal(true);
    }
    return setShow(false);
  }, [show, setShow]);

  const [deletePartnerRemark, deleteContactRemarkStatus] =
    organisationsApi.useDeletePartnerRemarkMutation();
  const deleteError = deleteContactRemarkStatus?.error;

  const handleDeleteCick = async () => {
    const payload = { userId: currentUser?._id, partnerId, remarkId };

    try {
      await deletePartnerRemark({
        payload,
      });

      callback();
      setShowModal(false);
      setShow(false);
    } catch (e) {
      console.error(e);
    }
  };

  const ChildrenElement = () => (
    <div>
      <span>
        {' '}
        You are about to permanently delete a remark by 
        <strong> {user?.firstName + ' ' + user?.lastName}</strong>
      </span>
    </div>
  );
  return (
    <ConfirmationModal
      title="Delete Remark"
      handleClose={() => {
        setShowModal(false);
        setShow(false);
      }}
      confirmButtonText="Delete"
      showSpinner={deleteContactRemarkStatus.isLoading}
      show={showModal}
      errorMessage={deleteError?.data}
      handleDelete={() => {
        handleDeleteCick();
      }}
      childrenElement={ChildrenElement}
      actionButtonColor="error"
    />
  );
};

export default DeleteCustomerRemarkModal;
