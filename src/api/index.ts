import makeRequest from "./makeRequest";

export const getEquipmentList = (params?: any) => {
  return makeRequest.get("/equipments", { params });
};

export const getEquipmentById = (id: string) => {
  return makeRequest.get(`/equipments/${id}`);
};

export const getVendorList = (params?: any) => {
  return makeRequest.get("/vendors", { params });
};

export const getVendorById = (id: string) => {
  return makeRequest.get(`/vendors/${id}`);
};

export const getMyOrderList = (params?: any) => {
  return makeRequest.get("/orderDetails", { params });
};

export const getOrderItemList = (params?: any) => {
  return makeRequest.get("/orderItems", { params });
};

export const getUsers = (params?: any) => {
  return makeRequest.get("/users", { params });
};
