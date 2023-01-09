import { Injectable } from '@nestjs/common';

import { IncomingHttpHeaders } from 'http2';
import { request } from 'urllib';
import { HttpMethod } from 'urllib/src/esm/Request';

import { InvalidToken } from '../../../../application/use-cases/errors';
import { serializeCookie } from '../../../../helpers/serialize-cookie';
import { JWT } from '../../../../helpers/jwt';

interface GetRequestProps {
  route: string;
  headers?: Record<string, string>;
}

interface PostRequestProps {
  route: string;
  data: Record<string, string>;
}

interface BuildRequestOptionsProps {
  method:
    | HttpMethod
    | 'get'
    | 'head'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | 'patch';
  route: string;
  headers?: IncomingHttpHeaders;
  data?: Record<string, string>;
}

@Injectable()
export class ApiService {
  public readonly BASE_URL = 'https://siga.cps.sp.gov.br';
  public readonly COOKIE_FIELD_NAME = 'ASP.NET_SessionId';
  public readonly USER_INPUT = 'vSIS_USUARIOID';
  public readonly PASS_INPUT = 'vSIS_USUARIOSENHA';
  public readonly USER_AGENT =
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';
  public readonly GX_STATE = `{"_EventName":"E'EVT_CONFIRMAR'.","_EventGridId":"","_EventRowId":"","MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vSAIDA":"","vREC_SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"D1ABEAAE18039C602CD8FD7385F248CD","AJAX_SECURITY_TOKEN":"84F199CDDB0C58592A768EFD8B54412708BB9745AE6F886B5BA6C30E7C998AEA","GX_CMP_OBJS":{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResourceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModified":"1"}`;
  public readonly STATUS_REDIRECT = 303;
  public readonly BTN_CONFIRM = 'BTCONFIRMA';
  public readonly ROUTES = {
    login: '/aluno/login.aspx',
    home: '/aluno/home.aspx',
    partialGrade: '/aluno/notasparciais.aspx',
    schedule: '/aluno/horario.aspx',
    partialAbsences: '/aluno/faltasparciais.aspx',
    examsCalendar: '/aluno/calendarioprovas.aspx',
    schoolGrade: '/aluno/historicograde.aspx',
    history: '/aluno/historicocompleto.aspx',
  };

  constructor(private jwt: JWT) {}

  private buildRequestOptions({
    method,
    route,
    headers,
    data,
  }: BuildRequestOptionsProps) {
    headers = {
      ...headers,
      'user-agent': this.USER_AGENT,
      origin: this.BASE_URL,
    };

    const url = route.startsWith('http')
      ? route
      : `${this.BASE_URL}${this.ROUTES[route]}`;

    if (method.toLowerCase() === 'post') {
      headers['content-type'] = 'application/x-www-form-urlencoded';
      data = { ...data, GXState: this.GX_STATE };
    }

    return {
      url,
      options: {
        data,
        headers,
        method,
        maxRedirects: 0,
      },
    };
  }

  async get({ route, headers }: GetRequestProps) {
    const req = this.buildRequestOptions({
      method: 'GET',
      route,
      headers,
    });

    const { data, res } = await request(req.url, req.options);

    return {
      data: data.toString('utf-8'),
      success: res.statusCode !== this.STATUS_REDIRECT,
    };
  }

  async post({ route, data }: PostRequestProps) {
    const req = this.buildRequestOptions({
      method: 'POST',
      route,
      data,
    });

    return request(req.url, req.options);
  }

  public validateAuthorization(authorization: string): { cookie: string } {
    const token = authorization.split(' ')[1];

    const decodedToken = this.jwt.verify(token);
    if (!decodedToken) {
      throw new InvalidToken();
    }

    const serializedCookie = serializeCookie({
      [this.COOKIE_FIELD_NAME]: decodedToken.cookie,
    });

    return { cookie: serializedCookie };
  }
}
