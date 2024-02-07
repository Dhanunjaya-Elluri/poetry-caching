import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import {
  setAuth,
  finishInitialLoad,
  setUser,
} from '@/redux/features/authSlice';
import {
  useRetrieveUserQuery,
  useVerifyMutation,
} from '@/redux/features/authApiSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  // This query runs immediately when the component mounts
  const { data: userData } = useRetrieveUserQuery();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        // Dispatch setUser in a separate effect when userData is available
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, [dispatch, verify]);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);
}
