import {renderHook, act} from 'test-utils';
import {useReceiveStore} from './receive.store';

describe('useReceiveStore', () => {
  test('should set submission items', () => {
    const {result} = renderHook(() => useReceiveStore());
    const mockItem = {
      id: '1',
      description: 'Item 1',
      assignmentType: 'xxx',
      servicesRequested: [
        {id: '1', name: 'Service 1'},
        {id: '2', name: 'Service 2'},
      ],
      submissionId: '123',
    };

    act(() => {
      result.current.setSubmissionItems([mockItem]);
    });

    expect(result.current.submissionItems).toEqual([mockItem]);
  });

  test('should set active process step', () => {
    const {result} = renderHook(() => useReceiveStore());

    act(() => {
      result.current.setActiveProcessStep(1);
    });

    expect(result.current.activeProcessStep).toBe(1);
  });
});
