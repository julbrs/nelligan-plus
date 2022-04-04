import api from "nelligan-api";
import { errorObject, headers, retrieveCardInfo } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const card = await retrieveCardInfo(event);

  if (!event.body) {
    throw new Error("No book info provided in body");
  }
  const { record } = JSON.parse(event.body);
  try {
    const success = await api.reserve(card, record, card.library);
    if (success) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Book reserved!" }),
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "This book is not available." }),
      };
    }
  } catch (e) {
    return errorObject(e);
  }
};
