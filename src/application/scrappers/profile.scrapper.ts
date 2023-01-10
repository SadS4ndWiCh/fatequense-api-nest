import { Injectable } from '@nestjs/common';
import { GXState } from '../../helpers/gxstate';
import { toTitleCase } from '../../helpers/to-title-case';

@Injectable()
export class ProfileScrapper {
  constructor(private gxstate: GXState) {}

  async scrap(html: string) {
    const { $, ...gxstate } = this.gxstate.extractOf(html);

    const photoUrl = $(`#${gxstate.prefix}FOTO > img`).attr()?.src;

    const profile: IProfile = {
      name: toTitleCase(gxstate.get('vPRO_PESSOALNOME').replace(' -', '')),
      personalEmail: gxstate.get('vPRO_PESSOALEMAIL'),
      institutionalEmail: gxstate.get('vINSTITUCIONALFATEC', true),
      cpf: gxstate.get('vPRO_PESSOALDOCSCPF'),
      birthday: gxstate.get('vPRO_PESSOALDATANASCIMENTO'),
      averageGrade: Number(gxstate.get('vACD_ALUNOCURSOINDICEPR', true)),
      progression: Number(gxstate.get('vACD_ALUNOCURSOINDICEPP', true)),
      photoUrl,
      college: {
        name: gxstate.get('vUNI_UNIDADENOME_MPAGE'),
        courseName: gxstate.get('vACD_CURSONOME_MPAGE'),
        currentSemester: Number(gxstate.get('vACD_ALUNOCURSOCICLOATUAL', true)),
        coursePeriod: gxstate.get('vACD_PERIODODESCRICAO_MPAGE'),
        state: gxstate.get('vSITUACAO_MPAGE'),
      },
    };

    return profile;
  }
}
