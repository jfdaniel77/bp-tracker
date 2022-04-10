import { withSentry } from "@sentry/nextjs";
import { fetchData, saveData } from "../../util/mongodb";

const handler = async (req, res) => {
    const jsonData = await fetchData()
    if (jsonData) {
        res.status(200).json(jsonData)
    } else {
        res.status(200).json({
            message: "No data found"
        })
    }
};

export default withSentry(handler);