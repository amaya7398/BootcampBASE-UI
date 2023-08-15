import { useMutation } from "@tanstack/react-query";
import { Account, Client, ClientDTO, Currency } from "../interfaces";

import { httpClient } from "../http";

//Customer Controller =====================================================
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

export const useGetCustomerById = () => {
	return useMutation({
		mutationKey: ["Customer"],
		mutationFn: async (customerId: string) => {
			const { data } = await httpClient.get<Client>(`/customers/${customerId}`, {});
			return data;
		}
	})
}
//FIN Customer Controller =====================================================

//Account Controller =====================================================
export const useGetAccountsOfCustomerById = () => {
	return useMutation({
		mutationKey: ["Accounts"],
		mutationFn: async (customerId: string) => {
			const newCustomerId = parseInt(customerId);
			const { data } = await httpClient.get<Account[]>(`/accounts/${newCustomerId}`);
			return data;
		}
	});
}
//FIN Account Controller =====================================================

//Currencies Controller =====================================================
export const useGetCurrencies = () => {
	return useMutation({
		mutationKey: ["Currencies"],
		mutationFn: async (symbol: string) => {
			const { data } = await httpClient.get<Currency[]>("/currency")
			return data;
		}
	})
}
//FIN Currencies Controller =====================================================