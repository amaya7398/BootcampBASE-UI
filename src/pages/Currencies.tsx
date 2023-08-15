import { IconCoin } from "@tabler/icons-react";
import { Currency, DropdownOrderBy, Header, SearchInput } from "../components";
import { useEffect, useState } from "react";
import { Currency as ICurrency } from "../interfaces"
import { currenciesMock } from "../mocks";
import { useGetCurrencies } from "../api";
import { FetchingData } from "../components/FetchingData";

export const Currencies = () => {
	const [currencies, setCurrencies] = useState<ICurrency[]>([]);
	const [currentOrderOption, setCurrentOrderOption] = useState<string>("name");
	const orderOptionsCurrencies: { label: string; value: string }[] = [
		{ label: "Nombre", value: "name", },
		{ label: "Cambio", value: "symbol", },
		{ label: "Valor", value: "value", },
	];

	const { isError, isLoading, mutate: mutateCurrencies } = useGetCurrencies();

	useEffect(() => {
		getCurrencies();
		setCurrencies((prevState) => orderCurrencies(prevState, currentOrderOption));
	}, [])

	const getCurrencies = () => {
		mutateCurrencies("MXN", {
			onSuccess: data => setCurrencies(data),
		})
	}

	const orderCurrencies = (currencies: ICurrency[], currentOrderOption: string): ICurrency[] => {
		const key = currentOrderOption as keyof ICurrency;
		const newcurrencies: ICurrency[] = currencies.sort((a: ICurrency, b: ICurrency) => {
			if (a[key] > b[key]) return 1;
			if (a[key] < b[key]) return -1;
			return 0;
		})
		return newcurrencies;
	}

	const handleSearch = (searchWord: string) => {
		if (searchWord === "") {
			getCurrencies();
			setCurrencies((prevState) => orderCurrencies(prevState, currentOrderOption));
			// setCurrencies(orderCurrencies(currenciesMock, currentOrderOption));
		} else {
			const searchWordLowerCase = searchWord.toLowerCase();
			const newCurrencies = currencies.filter(currency => {
				return (currency.name.toLowerCase().includes(searchWordLowerCase)
					|| currency.symbol.toLowerCase().includes(searchWordLowerCase)
					|| currency.value.toString().toLowerCase().includes(searchWordLowerCase)
				)
			})
			setCurrencies(newCurrencies);
		}
	}



	return (
		<>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Divisas
				</h1>
				<div className="flex sm:w-96 w-full gap-2">
					<DropdownOrderBy
						onChange={(e) => {
							setCurrentOrderOption(e.target.value);
							setCurrencies(orderCurrencies(currencies, e.target.value))
						}}
						options={orderOptionsCurrencies}
						value={currentOrderOption}
					/>
					<SearchInput
						Icon={IconCoin}
						onSearch={(e) => handleSearch(e.target.value)}
						propertie="divisa"
					/>
				</div>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<FetchingData isLoading={isLoading} isError={isError}>
					<ul role="list" className="grid w-full gap-3 overflow-auto divide-y divide-gray-100 sm:grid-cols-2 xl:grid-cols-4 my-7">
						{currencies.map((currency, idx) =>
							<Currency currency={currency} key={idx} />
						)}
					</ul>
				</FetchingData>

			</section>
		</>
	);
};
