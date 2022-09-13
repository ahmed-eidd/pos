import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import Text from '../../components/Text/Text';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import SingleSavedOrder from './SingleSavedOrder/SingleSavedOrder';
import classes from './SavedOrders.module.scss';
import { Modal } from 'antd';
import Button from '../../components/Button/Button';

const SavedOrders = () => {
  const [currentLang] = useCurrentLang();
  const [modalOpen, setModalOpen] = useState(false);
  const savedOrderLocale = locale.savedOrders;
  const onModalClose = () => {
    setModalOpen(false);
  };
  const onModalOk = () => {};

  return (
    <>
      <PageLayout title={savedOrderLocale.title[currentLang]}>
        <div className={classes.SavedOrders}>
          <Text className={classes.SavedOrders__Title}>
            {savedOrderLocale.chooseSavedOrder[currentLang]}
          </Text>
          <SingleSavedOrder
            onClick={() => {
              setModalOpen(true);
            }}
          />
          <SingleSavedOrder />
        </div>
      </PageLayout>

      <Modal
        onCancel={onModalClose}
        destroyOnClose
        footer={null}
        closable={false}
        visible={modalOpen}
        zIndex={10000}
      >
        <p className={classes.SavedOrders__Modal__Title}>
          {savedOrderLocale.modalTitle[currentLang]}
        </p>
        <p className={classes.SavedOrders__Modal__Label}>
          {savedOrderLocale.modalLabel[currentLang]}
        </p>
        <div className={classes.SavedOrders__Modal__Actions}>
          <Button onClick={onModalClose} type='default' fullwidth>
            {savedOrderLocale.modalClose[currentLang]}
          </Button>
          <Button onClick={onModalOk} fullwidth>
            {savedOrderLocale.modalOk[currentLang]}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SavedOrders;
