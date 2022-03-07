import api from "nelligan-api";
import { headers } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(api.libraries),
  };
};
