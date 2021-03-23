export interface IStage {
  id: string;
  name: string;
  date: string;
}

export interface IStageRace {
  id: number;
  name: string;
  stages: IStage[];
}

export interface IProvisionalStageRace extends Omit<IStageRace, "id"> {}
