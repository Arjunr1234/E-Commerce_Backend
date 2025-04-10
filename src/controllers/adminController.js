import mongoose from "mongoose";
import { HttpStatusCode } from "../constants/statusCodes.js";
import {
  customerDataService,
  orderDataService,
  orderDetailsService,
  productDataService,
  reportDataService,
  revenueDataService,
} from "../services/adminService.js";

export const revenueData = async (req, res, next) => {
  try {
    const response = await revenueDataService();

    return res.status(HttpStatusCode.OK).json({
      success: true,
      totalRevenue: response.totalRevenue,
      totalCustomers: response.totalCustomers,
      monthlyRevenue: response.monthlyRevenue,
      weekelyRevenue: response.weeklyData,
    });
  } catch (error) {
    next(error);
  }
};

export const customerData = async (req, res, next) => {
  try {
    console.log("Thsi is req.querY: ", req.query);
    const response = await customerDataService();

    return res
      .status(HttpStatusCode.OK)
      .json({
        success: true,
        customers: response.customers,
        customerLocation: response.customerLocation,
      });
  } catch (error) {
    next(error);
  }
};

export const productData = async (req, res, next) => {
  try {
    const response = await productDataService();
    console.log("response: ", response);
    return res
      .status(HttpStatusCode.OK)
      .json({ success: true, products: response.products });
  } catch (error) {
    next(error);
  }
};

export const orderData = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;

    const data = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      status,
    };

    const response = await orderDataService(data);
    return res.status(HttpStatusCode.OK).json({
      success: true,
      bestCategory: response.bestCategory,
      orderStatus: response.orderStatus,
      orders: response.orders,
      totalOrders: response.totalOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const reportData = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const response = await reportDataService(startDate, endDate);

    return res.status(HttpStatusCode.OK).json({
      success: true,
      salesData: response.reportData,
    });
  } catch (error) {
    next(error);
  }
};

export const orderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await orderDetailsService(id);

    return res.status(HttpStatusCode.OK).json({
      success: true,
      orderDetails: response.order,
    });
  } catch (error) {
    next(error);
  }
};
