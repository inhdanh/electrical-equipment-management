import makeRequest from "./makeRequest";

export const getEquipmentList = (params: any) => {
  return makeRequest.get("/equipments", { params: params });
};
