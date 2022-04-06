import api from "nelligan-api";
import { BookToRenew, errorObject, headers, retrieveCardInfo } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const list: APIGatewayProxyHandlerV2 = async (event) => {
  const card = await retrieveCardInfo(event);
  try {
    const books = await api.books(card);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(books),
    };
  } catch (e) {
    return errorObject(e);
  }
};

export const get: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const bookInfo = await api.bookinfo(event?.pathParameters?.record);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(bookInfo),
    };
  } catch (e) {
    return errorObject(e);
  }
};

export const renew: APIGatewayProxyHandlerV2 = async (event) => {
  const card = await retrieveCardInfo(event);

  if (!event.body) {
    return errorObject("No book!");
  }

  const book = JSON.parse(event?.body) as BookToRenew;

  try {
    const data = await api.renew(card, book);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return {
        statusCode: 500,
        headers,
        body: e.message,
      };
    }
    return {
      statusCode: 500,
      headers,
      body: e,
    };
  }
};
