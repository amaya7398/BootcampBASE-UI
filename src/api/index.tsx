import { useMutation } from "@tanstack/react-query";
import { Client, ClientDTO } from "../interfaces";

import { httpClient } from "../http";

export const useGetCustomers = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async (name: string) => {
			const { data } = await httpClient.get<Client[]>("/customers", {
				params: {
					name,
				},
			});

			return data;
		},
	});
};

export const useCreateCustomer = () => {
	return useMutation({
		mutationKey: ["Customers"],
		mutationFn: async (customer: Omit<Client, "customerId">) => {
			const { data } = await httpClient.post<ClientDTO>("/customers", {
				...customer,
			});

			return data;
		},
	});
};
