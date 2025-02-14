import { filter, propEq, find, pathOr, pipe } from "ramda";

import { namespace } from "./emissions.slice";
import { EmissionType } from "../../interfaces";

const getAllEmissions = pathOr([], [namespace]);

const getEmissionById = (state, id: string) =>
  find(propEq("id", id))(state[namespace]);

const getEmissionsToMitigate = (state) =>
  pipe(getAllEmissions, filter(propEq("isMitigated", false)))(state);

const getEmissionsMitigated = (state) =>
  pipe(getAllEmissions, filter(propEq("isMitigated", true)))(state);

const isTransportEmission = (emission) =>
  emission.emissionType === EmissionType.transport;

const isFoodEmission = (emission) =>
  emission.emissionType === EmissionType.food;

const isStreamingEmission = (emission) =>
  emission.emissionType === EmissionType.streaming;

const isElectricityEmission = (emission) =>
  emission.emissionType === EmissionType.electricity;

const isCustomEmission = (emission) =>
  emission.emissionType === EmissionType.custom;

const isOtherEmission = (emission) =>
  emission.emissionType === EmissionType.custom ||
  emission.emissionType === EmissionType.streaming ||
  emission.emissionType === EmissionType.electricity;

const getTransportEmissions = pipe(
  getAllEmissions,
  filter(isTransportEmission)
);

const getFoodEmissions = pipe(getAllEmissions, filter(isFoodEmission));

const getStreamingEmissions = pipe(
  getAllEmissions,
  filter(isStreamingEmission)
);

const getElectricityEmissions = pipe(
  getAllEmissions,
  filter(isElectricityEmission)
);

const getCustomEmissions = pipe(getAllEmissions, filter(isCustomEmission));

const getOtherEmissions = pipe(getAllEmissions, filter(isOtherEmission));

export default {
  getAllEmissions,
  getTransportEmissions,
  getFoodEmissions,
  getStreamingEmissions,
  getElectricityEmissions,
  getCustomEmissions,
  getOtherEmissions,
  getEmissionById,
  getEmissionsToMitigate,
  getEmissionsMitigated,
};
