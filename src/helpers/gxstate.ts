import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class GXState {
  parse(gxstate: string) {
    return JSON.parse(gxstate.replaceAll(/\\>/g, '&gt;'));
  }

  getPrefixOf(gxstate: string) {
    const matchResult = gxstate.match(/MPW\d{4}/);
    if (matchResult == null) return null;

    return matchResult[0];
  }

  extractOf(html: string) {
    const $ = cheerio.load(html);

    const gxstate = $('[name="GXState"]').val() as string;
    const gxstatePrefix = this.getPrefixOf(gxstate);
    const parsedGXState = this.parse(gxstate);

    return {
      default: gxstate,
      parsed: parsedGXState,
      prefix: gxstatePrefix,
      get: (key: string, withPrefix = false) => {
        const _key = withPrefix ? gxstatePrefix + key : key;
        return parsedGXState[_key];
      },
      $,
    };
  }
}
