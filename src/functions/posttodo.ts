import { document } from "../utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface ICreateToDo {
  title: string;
  deadline: Date
}

export const handle = async (event) => {
  const { id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateToDo;

  document.put({
    TableName: "todos",
    Item: {
      id: uuidv4(),
      user_id: id,
      title,
      deadline,
    }
  }).promise();
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "To do created"
    }),
    headers: {
      "Content-type": "application/json"
    }

  }
};