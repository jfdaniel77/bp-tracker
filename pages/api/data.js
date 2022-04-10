import { fetchData, saveData } from "../../util/mongodb";

export async function getData() {
    const response = await fetchData()
    return await response
}

export default async function handler(req, res) {
    const jsonData = await getData()
    if (jsonData) {
        res.status(200).json(jsonData)
    } else {
        res.status(200).json({
            message: "No data found"
        })
    }
}