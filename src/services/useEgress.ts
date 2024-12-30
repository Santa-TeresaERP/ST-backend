import Egress from '@models/rent_models/egress'
import { EgressAttributes } from '@type/egress'

class useEgress {
  static async createEgress(body: EgressAttributes) {
    const { monto, fecha, description } = body

    const newEgress = await Egress.create({
      description,
      monto,
      fecha,
    })
    if (!newEgress) {
      return null
    }

    return newEgress
  }
}

export default useEgress
