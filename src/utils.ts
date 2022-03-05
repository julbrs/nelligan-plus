import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export interface Card {
  id: string;
  name: string;
  code: string;
  pin: string;
}

export interface BookToRenew {
  rid: string;
  rvalue: string;
  barcode: string;
}

/**
 * CORS Headers
 */
export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const errorObject = (e: any) => {
  console.log(e);
  return {
    statusCode: 500,
    headers,
    body: JSON.stringify(e.message),
  };
};

export const extractIdentityId = (event: APIGatewayProxyEventV2) => {
  const requestContext: any = event.requestContext;
  return requestContext.authorizer.iam.cognitoIdentity.identityId;
};

export const retrieveCardInfo: Card | any = async (
  event: APIGatewayProxyEventV2
) => {
  const ddbClient = new DynamoDBClient({});

  const identityId = extractIdentityId(event);
  const id = event.pathParameters?.id;
  if (!id) {
    throw new Error("no card id provided");
  }
  const params = {
    TableName: process.env.TABLE,
    Key: {
      cardId: { S: id },
    },
  };
  // first check the item is linked to the right user
  const data = await ddbClient.send(new GetItemCommand(params));

  if (!data.Item || data.Item.cardUser.S !== identityId) {
    throw new Error("not your card");
  }
  return {
    id: "none",
    code: data.Item.cardCode.S,
    pin: data.Item.cardPin.S,
  };
};
