import ErrorService from "../middlewares/errorService.js";
import {
  customerDataRepo,
  orderDataRepo,
  orderDetaisRepo,
  productDataRepo,
  reportDataRepo,
  revenueDataRepo,
} from "../repository.js/adminRepository.js";

export const revenueDataService = async () => {
  try {
    const response = await revenueDataRepo();

    const orders = response.orders;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const now = new Date();
    const currentDay = now.getDay();
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const revenueMap = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);

      if (createdAt >= startOfWeek && order.status === "Completed") {
        const dayName = days[createdAt.getDay()];
        revenueMap[dayName] += order.totalAmount;
      }
    });

    const weeklyData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
      (day) => ({
        name: day,
        revenue: revenueMap[day],
      })
    );

    return { weeklyData, ...response };
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const customerDataService = async () => {
  try {
    const response = await customerDataRepo();
    return response;
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const productDataService = async () => {
  try {
    const response = await productDataRepo();
    return response;
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const orderDataService = async (data) => {
  try {
    const response = await orderDataRepo(data);

    return response;
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const reportDataService = async (startDate, endDate) => {
  try {
    
    const response = await reportDataRepo(startDate, endDate);
    return response;
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};

export const orderDetailsService = async (orderId) => {
  try {
    const response = await orderDetaisRepo(orderId);
    return response;
  } catch (error) {
    throw new ErrorService(error.message, error.statusCode);
  }
};
