import { Injectable } from '@nestjs/common';
import { GXState } from '@helpers/gxstate';

@Injectable()
export class HistoryScrapper {
  constructor(private gxstate: GXState) {}

  async scrap(html: string) {
    const { ...gxstate } = this.gxstate.extractOf(html);

    const history: IDisciplineHistory[] = gxstate
      .get('vALU_ALUNONOTAS_SDT')
      .map(
        (disciplineHistory): IDisciplineHistory => ({
          cod: disciplineHistory.ACD_DisciplinaSigla,
          disciplineName: disciplineHistory.ACD_DisciplinaNome,
          description: disciplineHistory.GER_TipoObservacaoHistoricoDescricao,
          finalGrade: disciplineHistory.ACD_AlunoHistoricoItemMediaFinal,
          totalAbscences: disciplineHistory.ACD_AlunoHistoricoItemQtdFaltas,
          presenceFrequency:
            disciplineHistory.ACD_AlunoHistoricoItemFrequencia / 100,
          renunciantionAt:
            disciplineHistory.ACD_AlunoHistoricoItemDesistenciaData,
          isApproved: disciplineHistory.ACD_AlunoHistoricoItemAprovada === 1,
        }),
      );

    return history;
  }
}
