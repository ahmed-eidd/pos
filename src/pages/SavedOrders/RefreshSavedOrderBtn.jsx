import { UndoOutlined } from '@ant-design/icons';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import React from 'react'
import Flex from '../../components/Flex/Flex'
import { orderStatus } from '../../constants/orderStatus';
import { queryKeys } from '../../constants/queryKeys';
import { useGetOrders } from '../../hooks/query/useOrders';

const RefreshSavedOrderBtn = () => {
  const queryClient = useQueryClient()
  const isFetching = useIsFetching({
    queryKey: queryKeys.getSavedOrder
  })
  const handleRefresh = () => {
    queryClient.invalidateQueries(queryKeys.getSavedOrder)
  }
  return (
    <Flex justify="end" style={{ marginBottom: '1rem' }}>

      <Button
        size="large"
        onClick={handleRefresh}
        type="primary"
        icon={<UndoOutlined />}
        loading={!!isFetching}
      >
        تحديث
      </Button>
    </Flex>
  )
}

export default RefreshSavedOrderBtn
