import api from "nelligan-api";
import { errorObject, headers, retrieveCardInfo } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

/**
 * Not used yet in frontend
 * @param event
 * @returns
 */
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const card = await retrieveCardInfo(event);
  try {
    const history = await api.history(card);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(history),
    };
  } catch (e) {
    return errorObject(e);
  }
};
