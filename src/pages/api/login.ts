import jwt from 'jsonwebtoken';

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

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string

export default withRouteOptions(async (req, res) => {
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

  const token = jwt.sign(
    { cookie: cookies[COOKIE_FIELD_NAME] },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return res.status(200).json({ token });

}, {
  allowedMethods: ['POST'],
});