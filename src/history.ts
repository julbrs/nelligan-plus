import api from "nelligan-api";
import { errorObject, headers } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

/**
 * Not used yet in frontend
 * @param event
 * @returns
 */
export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    let history = await api.history(event.queryStringParameters);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(history),
    };
  } catch (e) {
    return errorObject(e);
  }
};
