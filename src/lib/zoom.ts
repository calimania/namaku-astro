/**
 * Requests a JWT to identify the client with zoom
 * @param param // Role_type – the user role. 1 specifies host or co-host, while 0 specifies participant
 * @returns
 */
export const getJWT = async (url: string, { user_identity, access_code, session_name, role }:  { user_identity: string, session_name: string, access_code: string, role: number}) => {
  const response = await fetch(new URL('/api/zoom', url), {
    method: 'POST',
    body: JSON.stringify({
      action: 'jwt',
      access_code,
      sessionName: session_name,
      role,
      sessionKey: '',
      userIdentity: user_identity,
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
    }
  });
  return await response.json();
}
