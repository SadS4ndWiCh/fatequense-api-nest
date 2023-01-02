import { Injectable } from '@nestjs/common';
import { GXState } from '@helpers/gxstate';

@Injectable()
export class NoticesScrapper {
  constructor(private gxstate: GXState) {}

  async scrap(html: string) {
    const { $ } = this.gxstate.extractOf(html);

    const $table = $('#TABLE5');
    $table.find('script').remove();

    const notices: string[] = $table
      .find('tr')
      .map((_, el) =>
        $(el)
          .find('p')
          .map(
            (_i, p) =>
              $(p).text().trim().replaceAll('\n', '').replaceAll('\t', ''),
            // .replaceAll(' ', ''),
          )
          .get()
          .filter((text) => text !== '')
          .join('\n'),
      )
      .get()
      .filter((notice) => notice !== '');

    return notices;
  }
}
