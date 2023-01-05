import { Injectable } from '@nestjs/common';
import { GXState } from '@helpers/gxstate';

@Injectable()
export class PartialAbsencesScrapper {
  constructor(private gxstate: GXState) {}

  async scrap(html: string) {
    const { ...gxstate } = this.gxstate.extractOf(html);

    const partialAbsences: IDisciplinePartialAbsences[] = gxstate
      .get('vFALTAS')
      .map(
        (discipline): IDisciplinePartialAbsences => ({
          cod: discipline.ACD_DisciplinaSigla.trim(),
          disciplineName: discipline.ACD_DisciplinaNome,
          totalPresences: discipline.TotalPresencas,
          totalAbsences: discipline.TotalAusencias,
          lessons: discipline.Aulas.map((lesson) => ({
            title: lesson.ACD_PlanoEnsinoConteudoTituloAula,
            date: lesson.ACD_PlanoEnsinoConteudoDataAula,
            presences: lesson.Presencas,
            absences: lesson.Ausencias,
          })),
        }),
      );

    return partialAbsences;
  }
}
