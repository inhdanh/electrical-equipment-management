import makeRequest from "./makeRequest";

export const getEquipmentList = (params?: any) => {
  return makeRequest.get("/equipments", { params });
};

export const getEquipmentById = (id: string) => {
  return makeRequest.get(`/equipments/id`, { params: { id } });
};

export const getVendorList = (params?: any) => {
  return makeRequest.get("/vendor", { params });
};

export const getVendorById = (id: string) => {
  return makeRequest.get(`/vendor/id`, { params: { id } });
};

export const getMyOrderList = (id: string) => {
  return makeRequest.get("/order/userid", { params: { id } });
};

export const getOrderItemList = (params?: any) => {
  return makeRequest.get("/orderItems", { params });
};

export const getUsers = (params?: any) => {
  return makeRequest.get("/users", { params });
};

export const createOrder = (payload: any) => {
  return makeRequest.post("/order/create", payload);
};
