import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useLoginMutation,
  useRetrieveUserQuery,
} from '@/redux/features/authApiSlice';
import { toast } from "sonner"
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, setUser } from '@/redux/features/authSlice';

export default function useLogin() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [shouldFetchUser, setShouldFetchUser] = useState(false);
  const { data: userData, refetch: fetchUser } = useRetrieveUserQuery(undefined, { skip: !shouldFetchUser });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useAppDispatch();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email, password })
      .unwrap()
      .then(() => {
        setShouldFetchUser(true); // Trigger user data fetch
      })
      .catch((error) => {
        console.error('Login failed:', error);
        toast.error('Failed to log in');
      });
  };

  useEffect(() => {
    if (shouldFetchUser) {
      fetchUser().then((fetchedUserData) => {
      if (fetchedUserData.data) { // Check if userData is defined
        dispatch(setUser(fetchedUserData.data)); // Dispatch only if userData is defined
        dispatch(setAuth());
        toast.success('Logged in');
        router.push('/dashboard');
      } else {
        // Handle the scenario where userData is undefined
        console.error('User data is undefined');
        toast.error('Failed to fetch user data');
      }
      }).catch((error) => {
        console.error('Failed to fetch user data:', error);
        toast.error('Failed to fetch user data');
      });
    }
  }, [shouldFetchUser, fetchUser, dispatch, router]);

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
