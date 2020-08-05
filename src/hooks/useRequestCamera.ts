import { hasIn, isNil } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

export function useRequestCamera(needRequest: boolean) {
  const [state, setState] = useState<PermissionState>('prompt');
  const { loading, error, value } = useAsync(async () => {
    if (!needRequest || state !== 'prompt') return;
    if (hasIn(navigator.permissions, 'query')) {
      return navigator.permissions.query({ name: 'camera' });
    } else if (hasIn(navigator.permissions, 'request')) {
      return navigator.permissions.request({ name: 'camera' });
    } else {
      setState('granted');
    }
  }, [needRequest, state]);
  useEffect(() => {
    if (isNil(value)) {
      return;
    } else if (error) {
      setState('granted');
      return;
    }
    const onChange = () => setState(value.state);
    value.addEventListener('change', onChange);
    return () => {
      value.removeEventListener('change', onChange);
    };
  }, [loading, error, value]);
  return state;
}
