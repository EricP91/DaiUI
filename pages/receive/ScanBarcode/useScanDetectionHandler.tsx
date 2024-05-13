import {showSnackbar} from '@cellebrite/design-system';
import {useScanEvidence} from 'api/receive';
import {useSnackbar} from 'notistack';
import {Dispatch, SetStateAction, useCallback, useContext, useEffect, useState} from 'react';
import {Trans} from 'react-i18next';
import useScanDetection from 'use-scan-detection';
import {ScanEvidenceDialogContext} from './ScanEvidenceContext';

export const useScanDetectionHandler = (): {
  isScanBarcodeInvalidAgencyDialogOpen: boolean;
  setIsScanBarcodeInvalidAgencyDialogOpen: Dispatch<SetStateAction<boolean>>;
} => {
  const [isScanBarcodeInvalidAgencyDialogOpen, setIsScanBarcodeInvalidAgencyDialogOpen] = useState<boolean>(false);
  const {setItems} = useContext(ScanEvidenceDialogContext);
  const {mutate, data, error, isSuccess} = useScanEvidence();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const ERROR_TOASTER_AUTOHIDE_DURATION_MS = 10000;
  const isDuplicateScannedItemError = error?.response?.status === 409;
  const isInvalidAgencyScannedItemError = error?.response?.status === 400;
  const errorItemCode = error?.response?.data?.itemCode;
  const errorFromDepartment = error?.response?.data?.fromDepartment;

  useScanDetection({
    onComplete: (code) => {
      mutate({params: {barcode: code}});
    },
  });

  const handleError = useCallback(() => {
    if (isDuplicateScannedItemError) {
      showSnackbar({
        message: (
          <Trans
            values={{
              itemCode: errorItemCode,
              fromDepartment: errorFromDepartment,
            }}
            i18nKey="evidence.receive.error.duplicate"
            components={{b: <b></b>}}
          />
        ),
        autoHideDuration: ERROR_TOASTER_AUTOHIDE_DURATION_MS,
        variant: 'error',
        enqueueSnackbar,
        closeSnackbar,
      });
    }
    if (isInvalidAgencyScannedItemError) {
      setIsScanBarcodeInvalidAgencyDialogOpen(true);
    }
  }, [
    closeSnackbar,
    enqueueSnackbar,
    errorFromDepartment,
    errorItemCode,
    isDuplicateScannedItemError,
    isInvalidAgencyScannedItemError,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setItems!((prev) => [...prev, data]);
      return;
    }
    handleError();
  }, [setItems, isSuccess, handleError, data]);

  return {
    isScanBarcodeInvalidAgencyDialogOpen,
    setIsScanBarcodeInvalidAgencyDialogOpen,
  };
};
