import {useTransactionStore} from './transaction.store';

describe('TransactionStore', () => {
  it('should set and get note', () => {
    const {setNote} = useTransactionStore.getState();

    setNote('Note');

    const {note} = useTransactionStore.getState();
    expect(note).toEqual('Note');
  });

  it('should set and get labSignature', () => {
    const {setLabSignature} = useTransactionStore.getState();

    const signature = {name: 'John Doe', dataUrl: 'example.com', isApproved: true};
    setLabSignature(signature);

    const {labSignature} = useTransactionStore.getState();
    expect(labSignature).toEqual(signature);
  });

  it('should set and get submitterSignature', () => {
    const {setSubmitterSignature} = useTransactionStore.getState();

    const signature = {name: 'Jane Smith', dataUrl: 'example.com', isApproved: false};
    setSubmitterSignature(signature);

    const {submitterSignature: submitterSignature} = useTransactionStore.getState();
    expect(submitterSignature).toEqual(signature);
  });
});
