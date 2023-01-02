import { Injectable } from '@nestjs/common';
import { GXState } from '@helpers/gxstate';

@Injectable()
export class PartialGradeScrapper {
  constructor(private gxstate: GXState) {}

  async scrap(html: string) {
    const { ...gxstate } = this.gxstate.extractOf(html);

    const partialGrades: IDisciplinePartialGrade[] = gxstate
      .get('vACD_ALUNONOTASPARCIAISRESUMO_SDT')
      .map(
        (discipline): IDisciplinePartialGrade => ({
          cod: discipline.ACD_DisciplinaSigla,
          disciplineName: discipline.ACD_DisciplinaNome,
          averageGrade: discipline.ACD_AlunoHistoricoItemMediaFinal,
          examsDates: discipline.Datas.map((examDate) => ({
            title: examDate.ACD_PlanoEnsinoAvaliacaoTitulo,
            startsAt: examDate.ACD_PlanoEnsinoAvaliacaoDataPrevista,
            grade: examDate.Avaliacoes[0].ACD_PlanoEnsinoAvaliacaoParcialNota,
          })),
        }),
      );

    return partialGrades;
  }
}
