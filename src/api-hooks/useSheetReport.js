import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '../constants/queryKeys';
import { getShiftId } from '../helper/localStorage';
import useApi from './useApi';

function useSheetReport() {
  const shiftId = getShiftId();
  const organizationId = useSelector(s => s.auth?.organizationId);
  console.log('useSheetReport  organizationId:', organizationId);

  console.log('useSheetReport  shiftId:', shiftId);
  const api = useApi();
  const http = async () => {
    const body = new FormData();
    body.append('shift', shiftId);
    const res = await api.post(`/SheetReport`, body);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.sheetReport, shiftId], http, {
    enabled: !!shiftId,
    onSuccess: res => {
      console.log('useSheetReport  res:', res);
    },
  });

  const sheetReport = data?.data?.sheet_report;

  return { sheetReport, sheetReportLod: isLoading };
}

export default useSheetReport;
