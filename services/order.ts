import { Order, Paginate, SuccessResponse } from "interfaces";
import request from "./request";

const orderService = {
  calculate: (id: number, data: any) =>
    request.post(`/dashboard/user/cart/calculate/${id}`, data),
  guestCalculate: (id: number, data: any) =>
    request.post(`/rest/cart/calculate/${id}`, data),
  checkCoupon: (data: any) => request.post(`/rest/coupons/check`, data),
  create: (data: any): Promise<SuccessResponse<Order>> =>
    request.post(`/dashboard/user/orders`, data),
  guestCreate: (data: any): Promise<SuccessResponse<Order>> =>
    request.post(`/rest/orders`, data),
  getAll: (params?: string): Promise<Paginate<Order>> =>
    request.get(`/dashboard/user/orders/paginate?${params}`),
  getById: (
    id: number,
    params?: any,
    headers?: any,
  ): Promise<SuccessResponse<Order>> =>
    request.get(`/dashboard/user/orders/${id}`, { params, headers }),
  guestTrack: ( id: number,
    params?: any,
    headers?: any,
  ): Promise<SuccessResponse<Order>> => request.get(`/rest/orders/${id}`, { params,headers}),
  cancel: (id: number) =>
    request.post(`/dashboard/user/orders/${id}/status/change?status=canceled`),
  review: (id: number, data: any) =>
    request.post(`/dashboard/user/orders/review/${id}`, data),
  autoRepeat: (id: number, data: any) =>
    request.post(`/dashboard/user/orders/${id}/repeat`, data),
  deleteAutoRepeat: (id: number) =>
    request.delete(`/dashboard/user/orders/${id}/delete-repeat`),
};

export default orderService;
