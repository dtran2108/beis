import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Redirect({ to }) {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, [to]);
  return null;
}

export default Redirect;
