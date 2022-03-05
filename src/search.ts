import api from "nelligan-api";
import { errorObject, headers } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body) {
    throw new Error();
  }
  const search = JSON.parse(event.body).search;
  try {
    const books = await api.search(search);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(books),
    };
  } catch (e) {
    return errorObject(e);
  }
};
