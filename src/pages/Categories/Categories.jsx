import { useQueryClient } from '@tanstack/react-query';
import { Alert, Col, message, Modal, Row } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import CategoriesTab from '../../components/CategoriesTabs/CategoriesTabs';
import Flex from '../../components/Flex/Flex';
import InputField from '../../components/InputField/InputField';
import Spinner from '../../components/Spinner/Spinner';
import Text from '../../components/Text/Text';
import { queryKeys } from '../../constants/queryKeys';
import { useAddToCart, useIncreaseQuantity } from '../../hooks/query/useCart';
import { useGetProducts } from '../../hooks/query/useGetProducts';
import { useCurrentCartItems } from '../../hooks/useCurrentCartItems';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import classes from './Categories.module.scss';

const Categories = () => {
  const client = useQueryClient();
  // state
  const [selectedProduct, setSelectedProduct] = useState(null); // selected product is a state for the current select product to add quantity to it in a saved order
  const [quantity, setQuantity] = useState(null);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const cartItems = client.getQueryData([queryKeys.getCart])?.data?.data?.cart
    ?.items;

  // zustand store
  const showSavedOrder = useSelector(state => state.cart.showSavedOrder);
  const activeCategory = useSelector(state => state.categories.activeCategory);

  // locale
  const [currentLang] = useCurrentLang();
  const categoriesLocale = locale.categoires;

  // react quey hooks
  const { data: savedOrder } = useCurrentCartItems();
  const { data: products, isLoading } = useGetProducts(
    activeCategory === 'all' ? '' : activeCategory
  );
  const addToCart = useAddToCart();
  const increaseQuantity = useIncreaseQuantity();

  // handlers
  const onAddToCartHandler = product => {
    if (showSavedOrder) {
      setQuantityModalVisible(true);
      setSelectedProduct(product);
      return;
    }
    if (product?.in_cart === 0) {
      addToCart.mutate({
        id: product?.id,
        type: product.type,
        quantity: 1,
      });
    } else {
      const prodId = cartItems?.find(el => el?.itemId === product?.id)?.id;
      if (!prodId) return null;
      increaseQuantity.mutate(prodId);
    }
  };

  const onQuantityModalOk = () => {
    if (quantity < 0 || !quantity) {
      message.error(
        categoriesLocale.quantityModal.validation.pleaseAddQuantity[currentLang]
      );
      return;
    }
    addToCart.mutate(
      {
        id: selectedProduct?.id,
        type: selectedProduct?.type,
        quantity: quantity,
        order_id: savedOrder?.id,
      },
      {
        onSuccess: data => {
          if (data.data.validation.length > 0) return;

          client.invalidateQueries([
            queryKeys.getSavedOrder,
            data?.data?.data?.order_id,
          ]);

          message.success(
            categoriesLocale.quantityModal.notifation.addSucess[currentLang]
          );
          setQuantityModalVisible(false);
        },
      }
    );
  };

  const onChangeQuantityHandler = e => {
    setQuantity(e.target.value);
  };

  const onCloseQuantityModal = () => {
    setQuantityModalVisible(false);
    setQuantity(null);
  };

  return (
    <div>
      <CategoriesTab />

      <Spinner
        fullWidth
        spinning={isLoading}
        spinnerStyle={{ margin: '10px' }}
      />
      <Row gutter={[10, 10]}>
        {products?.data?.data?.items?.map(el => (
          <Col key={el?.id}>
            <Card
              id={el?.id}
              name={el?.name}
              img={el?.image}
              price={el?.cost}
              onClick={() => onAddToCartHandler(el)}
              isLoading={addToCart.isLoading || increaseQuantity.isLoading}
            />
          </Col>
        ))}
        {activeCategory === 'all' &&
          products?.data?.data?.ingredients?.map(el => (
            <Col key={el?.id}>
              <Card
                id={el?.id}
                name={el?.name}
                img={el?.image}
                price={el?.cost}
                // onClick={() => onAddToCartHandler(el.id)}
                onClick={() => onAddToCartHandler(el)}
                isLoading={addToCart.isLoading || increaseQuantity.isLoading}
              />
            </Col>
          ))}
      </Row>

      <Modal
        visible={quantityModalVisible}
        onCancel={onCloseQuantityModal}
        footer={null}
        className={classes.Categories__QuantityModal}
      >
        <Flex direction="column" align="flex-start" justify="center" gap="10px">
          <Text>{selectedProduct?.name}</Text>
          <InputField
            type="number"
            placeholder={
              categoriesLocale.quantityModal.inputPlacehodler[currentLang]
            }
            onChange={onChangeQuantityHandler}
            value={quantity}
          />
          <Flex justify="center" gap="10px">
            <Button
              onClick={onQuantityModalOk}
              isLoading={addToCart.isLoading}
              fullwidth
            >
              {categoriesLocale.quantityModal.add[currentLang]}
            </Button>
            <Button
              isLoading={addToCart.isLoading}
              onClick={onCloseQuantityModal}
              type="danger"
              fullwidth
            >
              {categoriesLocale.quantityModal.cancel[currentLang]}
            </Button>
          </Flex>
          <Alert
            message={categoriesLocale.quantityModal.warning[currentLang]}
            type="warning"
            style={{ width: '100%' }}
          />
        </Flex>
      </Modal>
    </div>
  );
};

export default Categories;
