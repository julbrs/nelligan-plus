import { Card, errorObject, extractIdentityId, headers } from "./utils";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { v4 as uuid } from "uuid";
import api from "nelligan-api";

import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

export const list: APIGatewayProxyHandlerV2 = async (event) => {
  const ddbClient = new DynamoDBClient({});
  const identityId = extractIdentityId(event);

  const params = {
    FilterExpression: "cardUser = :c",
    ExpressionAttributeValues: {
      ":c": { S: identityId },
    },
    TableName: process.env.TABLE,
  };

  try {
    const data = await ddbClient.send(new ScanCommand(params));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(
        data.Items?.map((e) => ({
          id: e.cardId.S,
          name: e.cardName.S,
          code: e.cardCode.S,
          library: api.libraries.find((l: any) => l.code === e.cardLibrary.S)
            .value,
        }))
      ),
    };
  } catch (e) {
    console.error(e);
    return errorObject(e);
  }
};

export const add: APIGatewayProxyHandlerV2 = async (event) => {
  const ddbClient = new DynamoDBClient({});
  const identityId = extractIdentityId(event);

  if (!event.body) {
    return errorObject("No card!");
  }

  const card = JSON.parse(event?.body) as Card;
  const id = uuid();
  const params = {
    TableName: process.env.TABLE,
    Item: {
      cardId: { S: id },
      cardUser: { S: identityId },
      cardName: { S: card.name },
      cardCode: { S: card.code },
      cardPin: { S: card.pin },
      cardLibrary: { S: card.library },
    },
  };
  try {
    await ddbClient.send(new PutItemCommand(params));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id, name: card.name, pin: card.pin }),
    };
  } catch (e) {
    return errorObject(e);
  }
};

export const remove: APIGatewayProxyHandlerV2 = async (event) => {
  const ddbClient = new DynamoDBClient({});

  const id = event.pathParameters?.id;
  const identityId = extractIdentityId(event);

  if (!id) {
    return errorObject("no card id provided");
  }
  const params = {
    TableName: process.env.TABLE,
    Key: {
      cardId: { S: id },
    },
  };

  try {
    // first check the item is linked to the right user
    const data = await ddbClient.send(new GetItemCommand(params));

    if (!data.Item || data.Item.cardUser.S !== identityId) {
      return errorObject("not your card");
    }
    // then delete
    await ddbClient.send(new DeleteItemCommand(params));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify("item deleted"),
    };
  } catch (e) {
    return errorObject(e);
  }
};
