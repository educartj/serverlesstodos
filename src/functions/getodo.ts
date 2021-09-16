import { document } from "../utils/dynamodbClient";
export const handle  = async (event) => {
  const { id } = event.pathParameters;
  const response = await document.query({
    TableName: "todos",
    KeyConditionExpression: "user_id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();
 const todos =  response.Items;
 if(todos){
   return {
     statusCode:200,
     body: todos
   }
 }
 return {
   statusCode: 400,
   body:JSON.stringify({
    message:"Certificado inválido",
    url:""
  })

 }
}