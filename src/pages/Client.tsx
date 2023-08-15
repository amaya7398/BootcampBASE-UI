import { IconPlus } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

import { Header } from "../components/Header";
import { useGetAccountsOfCustomerById, useGetCustomerById } from "../api";
import { useEffect, useState } from "react";
import { Account, Client as IClient } from "../interfaces";
import { CreditCard } from "../components";
import { FetchingData } from "../components/FetchingData";

export const Client = () => {
	const { id = "" } = useParams<string>();
	const [customer, setCustomer] = useState<IClient>({
		customerId: 0,
		name: "",
		curp: "",
		gender: "",
		birthdate: "",
	});
	const [accounts, setAccounts] = useState<Account[]>([]);

	const getCustomerById = useGetCustomerById();
	const { isLoading, isError, mutate: mutateAccountsById } = useGetAccountsOfCustomerById();


	useEffect(() => {
		getCustomerInfo();
		getAccountsInfo();
	}, [])

	const getCustomerInfo = () => {
		getCustomerById.mutate(id, {
			onSuccess: (data) => setCustomer({ ...data }),
		})
	}
	const getAccountsInfo = () => {
		mutateAccountsById(id, {
			onSuccess: data => setAccounts(data),
		})
	}

	return (
		<>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
					{customer.name}
				</h1>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<FetchingData isLoading={isLoading} isError={isError}>
					<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 py-7 w-full">
						{accounts.map((acc, idx) => (
							<CreditCard name={customer.name} cardNumber={acc.accountNumber} balance={acc.balance} key={idx}></CreditCard>
						))}
					</ul>
				</FetchingData>
			</section>

			<button className="fixed right-8 bottom-8 p-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
				<div className="flex gap-2 items-center">
					<IconPlus className="w-4 h-4" />
					<span>Añadir cuenta</span>
				</div>
			</button>
		</>
	);
};
