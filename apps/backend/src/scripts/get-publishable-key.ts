import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function getPublishableKey({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id", "title", "token", "type"],
  })
  console.log("PUBLISHABLE_KEY_RESULT:" + JSON.stringify(data))
}
