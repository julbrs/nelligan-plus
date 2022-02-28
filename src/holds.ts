import api from "nelligan-api";
import { errorObject, headers, retrieveCardInfo } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const card = await retrieveCardInfo(event);
  try {
    const holds = await api.hold(card);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(holds),
    };
  } catch (e) {
    return errorObject(e);
  }
};
