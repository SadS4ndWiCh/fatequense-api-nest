// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { api } from './_libs/api';
import {
  BTN_CONFIRM,
  COOKIE_FIELD_NAME,
  PASSWORD_INPUT,
  STATUS,
  USERNAME_INPUT
} from './_libs/network';
import { authSigaBody } from './_libs/schemas';
import { withRouteOptions } from './_libs/utils/api-route';
import { parseCookie } from './_libs/utils/cookie';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = authSigaBody.parse(req.body);

  const { res: responseLogin } = await api.post('login', {
    [USERNAME_INPUT]: username,
    [PASSWORD_INPUT]: password,
    [BTN_CONFIRM]: 'Confirmar',
  });

  if (responseLogin.statusCode !== STATUS.redirect) {
    return res.status(400).json({ error: 'Não foi possível logar na conta' });
  }

  const cookies = parseCookie(String(responseLogin.headers['set-cookie']));
  return res.status(200).json({
    cookie: cookies[COOKIE_FIELD_NAME],
  });
}

export default withRouteOptions({
  options: { allowedMethods: ['POST'] },
  handler
})