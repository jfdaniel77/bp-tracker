import { fetchData, saveData } from "./mongodb";

export async function getData() {
    const response = await fetchData()
    return await response
}
