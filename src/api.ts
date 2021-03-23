import axios from "axios";
import { IStageRace, IProvisionalStageRace } from "./types";

// https://github.com/axios/axios#creating-an-instance
export const adapter = axios.create({
  baseURL: "http://localhost:4000",
});

export const getStageRaces = async (): Promise<IStageRace[]> => {
  const response = await adapter.get("/stage-races");
  return response.data;
};

export const addStageRace = async (
  provisionalStageRace: IProvisionalStageRace
): Promise<IStageRace> => {
  const response = await adapter.post("/stage-races", provisionalStageRace);
  return response.data;
};

export const deleteStageRace = (id: number): Promise<void> =>
  adapter.delete(`/stage-races/${id}`);
