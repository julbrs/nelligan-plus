import api from "nelligan-api";
import { errorObject, headers, retrieveCardInfo } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const card = await retrieveCardInfo(event);

  if (!event.body) {
    throw new Error("No book info provided in body");
  }
  const { record, location } = JSON.parse(event.body);
  try {
    await api.reserve(card, record, location);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Book reserved!" }),
    };
  } catch (e) {
    return errorObject(e);
  }
};
