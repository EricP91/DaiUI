import {UseMutationResult, UseQueryResult} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {Submission, ReceiveResponse} from 'types/receive';
import {UsePostVariables, useFetch, usePost} from 'utils/react-query';
import {apiRoutes} from 'utils/routes/api-routes';

export const useScanEvidence = (): UseMutationResult<
  ReceiveResponse,
  AxiosError<ReceiveResponse>,
  UsePostVariables
> => {
  return usePost<ReceiveResponse>({url: apiRoutes.receive.root});
};

export const useGetPendingSubmissions = (): UseQueryResult<Submission[], Error> => {
  return useFetch<Submission[]>({
    url: apiRoutes.receive.pending,
    config: {retry: false, keepPreviousData: true},
  });
};

export const useGetReceiptEmails = (): UseQueryResult<string[], Error> => {
  return useFetch<string[]>({
    url: apiRoutes.receive.receiptEmails,
    config: {retry: false, keepPreviousData: true},
  });
};

export const useSendReceiptEmails = (emails: string[]): UseMutationResult<unknown, unknown, UsePostVariables> => {
  return usePost({url: apiRoutes.receive.receiptEmails, data: emails});
};
