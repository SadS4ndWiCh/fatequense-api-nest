declare global {
  export interface IDisciplineRaw {
    ACD_DisciplinaSigla: string;
    ACD_DisciplinaNome: string;
    Pro_PessoalNome: string;
  }

  export interface IDisciplineLessonsRaw {
    ACD_PlanoEnsinoConteudoTituloAula: string;
    ACD_PlanoEnsinoConteudoDataAula: string;
    Presencas: number;
    Ausencias: number;
  }

  export interface IDisciplinePartialAbsencesRaw extends IDisciplineRaw {
    Aulas: IDisciplineLessonsRaw[];
    TotalAusencias: number;
    TotalPresencas: number;
  }

  export interface IDisciplineHistoryRaw extends IDisciplineRaw {
    ACD_AlunoHistoricoItemMediaFinal: number;
    ACD_AlunoHistoricoItemQtdFaltas: number;
    ACD_AlunoHistoricoItemFrequencia: number;
    GER_TipoObservacaoHistoricoDescricao: string;
    ACD_AlunoHistoricoItemDesistenciaData: string;
    ACD_AlunoHistoricoItemAprovada: 0 | 1;
  }

  export type ExamTitle = 'P1' | 'P2' | 'P3';
  export interface IDisciplineExamDateRaw {
    ACD_PlanoEnsinoAvaliacaoTitulo: ExamTitle;
    ACD_PlanoEnsinoAvaliacaoDataPrevista: string;
    Avaliacoes: {
      ACD_PlanoEnsinoAvaliacaoParcialNota: number;
      ACD_PlanoEnsinoAvaliacaoParcialDataLancamento: string;
    }[];
  }
  export interface IDisciplinePartialGradeRaw extends IDisciplineRaw {
    ACD_AlunoHistoricoItemMediaFinal: number;
    Datas: IDisciplineExamDateRaw[];
  }

  export interface GXState {
    vUNI_UNIDADENOME_MPAGE: string;
    vACD_CURSONOME_MPAGE: string;
    vSITUACAO_MPAGE: string;
    vALU_ALUNONOTAS_SDT: DisciplineHistoryRaw[];
    vFALTAS: IDisciplinePartialAbsencesRaw[];
    vACD_ALUNONOTASPARCIAISRESUMO_SDT: IDisciplinePartialGradeRaw[];
    vACD_PERIODODESCRICAO_MPAGE: string;
    vALU_ALUNOHISTORICOITEM_SDT: IDisciplineRaw[];
    MPW0041: string;
    MPW0041vPRO_PESSOALNOME: string;
    MPW0041vACD_ALUNOCURSOREGISTROACADEMICOCURSO: string;
    MPW0041vACD_ALUNOCURSOCICLOATUAL: string;
    MPW0041vACD_ALUNOCURSOINDICEPP: string;
    MPW0041vACD_ALUNOCURSOINDICEPR: string;
    MPW0041vMAX_ACD_ALUNOCURSOINDICEPR: string;
    MPW0041vSEMESTRESCURSADOS: string;
    vTEXTO: string;
    vPRO_PESSOALNOME: string;
    vPRO_PESSOALEMAIL: string;
    vPRO_PESSOALDOCSCPF: string;
    vPRO_PESSOALDATANASCIMENTO: string;
    vACD_ALUNOCURSOINDICEPP: string;
    vACD_ALUNOCURSOINDICEPR: string;
  }
}

export {};
