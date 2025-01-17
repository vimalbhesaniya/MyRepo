"use client";
import axios from "axios";

export const useGetMethod = async (url: string) => {
  try {
    const data = await axios.get(url);
    return await data?.data;
  } catch (error) {
    return error;
  }
};

export const usePostMethod = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const useDeleteMethod = async (url: string, body?: any) => {
  try {
    const newData = await axios.delete(url, body);
    return await newData?.data;
  } catch (error) {
    return error;
  }
};

export const usePutMethod = async (url: string, body?: any) => {
  try {
    const newData = await axios.put(url, body);
    return await newData?.data;
  } catch (error) {
    return error;
  }
};
